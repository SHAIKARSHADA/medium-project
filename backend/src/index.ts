import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  verify, sign  } from 'hono/jwt'



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    SECRET_URL: string, // you can do this or else you use //@ts-ignore which will ignore the typescript error in the next line which is an bad practice.
  }
}>()

app.use('/api/v1/*',async (c, next) => {
  const body = c.req.header("Authorization");
  // @ts-ignore
  
  const token = await verify(body, c.env.SECRET_URL);
  
  if(!token) {
    return c.json({
      message: "unauthorised",
    })
  }
  //@ts-ignore
  c.set('userId',token.id);
  await next();
  
})

app.post('/api/v1/signup',async (c) => {
    const prisma = new PrismaClient({
      //@ts-ignore
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()

  await prisma.user.create({
    data:{
      email: body.email,
      password: body.password,
    }
  })

  //@ts-ignore
  const token = await sign(body.email, c.env.SECRET_URL);

  return c.json({
    token: token,
  })
})

app.post('/api/v1/signin', async (c) => {
  
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

  const body = await c.req.json()

  const res = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  })


  if(!res) {
    return c.json({
      message: "User doesnt exist, check your username or password",
    });
  }

  const token = await sign(body.email, c.env.SECRET_URL);

  return c.json({
    token: token,
  })
})

app.post('/api/v1/blog', (c) => {
  return c.text('')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello Hono!')
})


export default app
