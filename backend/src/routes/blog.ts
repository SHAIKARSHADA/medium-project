import { Hono } from "hono";
import { verify, sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// type Variables = string;

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  const user = await verify(authHeader, c.env.SECRET_URL);
  if (!user || !user.id) {
    return c.json({
      message: "unauthorised",
    })
  }

  console.log("I am Inside");
  // @ts-ignore
  c.set("userId", user.id)
  await next();
  console.log("I am outside");
})

// This route is working properly

blogRouter.post("/", async (c) => {
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
    },
  });

  return c.json(response.id);
});

// This route is working properly

blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");

  const blog = await prisma.post.update({
    where: {
      id: body.id,
      //@ts-ignore
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    }
  })

  return c.json(blog);
})


// In here the issue was it was needed an integer and I was given an string to it so, that was the error
blogRouter.get("/:id", async (c) => {
  const idParam = c.req.param("id"); // 
  const id = parseInt(idParam, 10);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findUnique({
      where: {
        // @ts-ignore
        id: id,
      },
    });
    return c.json(blog);
  } catch (e) {
    c.status(500);
    c.json({
      message: "error while fetching data",
    });
  }
});

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  return c.text("hello");
});
