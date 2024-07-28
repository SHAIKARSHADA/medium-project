import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify, sign } from "hono/jwt";
import { signinInput, signupInput } from "@shaik555/medium1";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_URL: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs incorrect"
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    const token = await sign({ id: user.id }, c.env.SECRET_URL);
    return c.json({
      token: token,
    });
  } catch (e) {
    return c.text("User name already exists");
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs incorrect"
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return c.json({
      message: "User doesnt exist, check your username or password",
    });
  }

  const token = await sign({ id: user.id }, c.env.SECRET_URL);

  return c.json({
    token: token,
  });
});
