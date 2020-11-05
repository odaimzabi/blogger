import express ,{Request,Response} from 'express';
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { UserResolver } from './resolvers/userResolver';
import { createConnection,getRepository} from "typeorm";
import  session from 'express-session'
import { TypeormStore } from 'typeorm-store';
import {Session}  from './entities/Session';
import { LoginResolver } from './resolvers/loginResolver';
import "reflect-metadata";
import cors from 'cors'
import { meResolver } from './resolvers/meResolver';
import { Context } from './types/context';
import { logoutResolver } from './resolvers/logoutResolver';
import { PostResolver } from './resolvers/postResolver';
const main=async()=>{

const app=express()

app.use(cors({origin:"http://localhost:3000",credentials:true}))


await createConnection({type: "sqlite",
database: "database.sqlite",
synchronize: true,
logging: true,
entities: ["./entities/**/*.ts"],
migrations: ["src/migration/**/*.ts"],
subscribers: ["src/subscriber/**/*.ts"],
cli: {
  entitiesDir: "./entities",
  migrationsDir: "src/migration",
  subscribersDir: "src/subscriber"
}})
const apolloServer=new ApolloServer({
        schema:await buildSchema({
                resolvers:[UserResolver,LoginResolver,meResolver,logoutResolver,PostResolver],
               
        }),
        context: ({ req, res }:Context) => ({ req, res })
})

const sessionRepo=getRepository(Session)
app.use(session({
        secret:"keyboard cat",
        name:"qid",
        resave:false,
        saveUninitialized: false,
        cookie:{
                httpOnly:true,
                secure:false,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
        },
        store: new TypeormStore({
                repository :sessionRepo,
                ttl:86400000,
        })
}))




apolloServer.applyMiddleware({app,cors:false})

app.listen(4000,()=>console.log("Server is running on port 4000=>http://localhost:4000/graphql"));


}
main().catch((err)=>console.log(err))