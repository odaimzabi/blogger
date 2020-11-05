import { Arg,Ctx,Mutation, Query, Resolver } from "type-graphql";
import {User} from '../entities/User'
import "reflect-metadata"
import { Context } from "../types/context";

@Resolver()
export  class UserResolver{
    @Query(()=>[User])
   async findUsers(){
     return await User.find()
    }
    @Mutation(()=>User)
    async createUser(@Ctx(){req}:Context ,@Arg('username',{nullable:false})username:string,@Arg('password',{nullable:false})password:string){
       const data=await User.create({username,password}).save()
       console.log(data)
       if (!data){
           return null
       }
       req.session.userId=data.id
        return data
    }   
   
}