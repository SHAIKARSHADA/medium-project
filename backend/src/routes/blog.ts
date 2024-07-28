import { Hono } from "hono";
import { verify, sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@shaik555/medium1";

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

// Middleware 


blogRouter.use("/*",async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  try {
    const user = await verify(authHeader, c.env.SECRET_URL);
  if (!user || !user.id) {
    return c.json({
      message: "unauthorised",
    })
  }


  // @ts-ignore

  c.set("userId", user?.id)
  await next();

  } catch(e) {
    c.status(411);
    return c.json({
      message: "user is not logged in"
    })
  }
})

// This route is working properly

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs incorrect"
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


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
  const body = await c.req.json();
  const userId = c.get("userId");
  const { success } = updateBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs incorrect"
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try{
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
  } catch (e) {
    c.status(500)
    return c.json({
      message: "You don't have permission to update other blog",
    })
  }
})

// blogRouter.get("/:id", async (c) => {
//   const idParam = c.req.param("id");
//   const id = parseInt(idParam, 10);

//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());


//   try {
//     const blog = await prisma.post.findUnique({
//       where: {
//         id: id,
//       },
//     });

//     if (!blog) {
//       c.status(404);
//       return c.json({ message: "Blog not found" });
//     }

//     return c.json(blog);
//   } catch (e) {
//     console.error('Error fetching blog:', e);
//     c.status(500);
//     return c.json({ message: "Error while fetching data" , error:
//       //@ts-ignore
//        e.message});
//   } finally {
//     await prisma.$disconnect();
//   }
// });


blogRouter.get("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findUnique({
      where: {
        // @ts-ignore
        id: body.id,
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

// bulk route 

blogRouter.get('/bulk', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findMany();


    return c.json({
      blog
    })

  } catch (e) {
    return c.json({
      message: e,
    })
  }
})
