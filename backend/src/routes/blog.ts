import { Hono } from "hono";
import { verify, sign } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

// type Variables = string;

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    SECRET_URL: string,
  },
  Variables: {
    userId: string,
  }
}>()

blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  const user = await verify(authHeader, c.env.SECRET_URL);
  if (!user || !user.id) {
    return c.json({
      message: "unauthorised",
    })
  }
  // @ts-ignore
    c.set("userId", user.id)
    await next();
})

blogRouter.post('/', async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  console.log(body);
  const response = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      // @ts-ignore
      authorId: userId,
    }
  })

  return c.json(response.id)
})


blogRouter.put('/', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: body.userId,
    }
  })

  return c.json({
    id: blog.id,
  })
})

blogRouter.get('/:id', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {

    const blog = await prisma.post.findFirst({
      where: {
        id: body.id
      },
      select: {
        title: body.title,
        content: body.content,
        authorId: body.userId,
      }
    })
  } catch(e) {
    c.status(411);
    c.json({
      message: "error while fetching data",
    })
  }
});

blogRouter.get('/bulk',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
   
  const blog = await prisma.post.findMany();

  return c.json({
    blog
  })

})
