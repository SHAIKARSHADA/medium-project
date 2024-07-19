import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string, // you can do this or else you use //@ts-ignore which will ignore the typescript error in the next line which is an bad practice.
  }
}>()

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
})

app.post('/api/v1/signin', (c) => {
  return c.text('signin route!')
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
