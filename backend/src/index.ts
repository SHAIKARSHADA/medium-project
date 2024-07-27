import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    SECRET_URL: string, // you can do this or else you use //@ts-ignore which will ignore the typescript error in the next line which is an bad practice.
  }
}>()

app.route("/api/v1/user", userRouter);
app.route("api/v1/blog", blogRouter)



export default app
