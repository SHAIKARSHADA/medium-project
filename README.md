# Medium Project

Start with creating folder name it anything and after inside the folder 

``` 
npm create hono@latest
```

and select the

>>Target directory backend
>>? Which template do you want to use? cloudflare-workers
>>✔ Cloning the template
>>? Do you want to install project dependencies? yes
>>? Which package manager do you want to use? npm
>>✔ Installing project dependencies

and do 

```
cd backend
```

and get an postgresql db and get the connection string 

and now use prisma to make an accelerate url to do the connection pooling 

and after that 

```
backend > npm i primsa
backend > npx prisma init
```

so, in here you will learn some new thing 

in .env file you will declare the direct database url which will be used by the CLI, connection pooling will not use it from here.  

but how can your connection pool use it ? you may ask.  

that is that will be used from wrangler.toml file in that you have declare it 

```
name = "backend"
compatibility_date = "2023-12-01"

[vars]
DATABASE_URL = "" 
```
give you prisma accelerate url in the database url

and then intialize the schema 
and then Migrate your database

```
npx prisma migrate dev --name init_schema
```
💡
Generate the prisma client 

```
npx prisma generate --no-engine
```

Add the accelerate extension

```
npm install @prisma/extension-accelerate
```

after this you have to write routes logic and sent them with jwt authentication
