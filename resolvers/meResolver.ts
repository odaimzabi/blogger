import {Ctx, Query, Resolver } from "type-graphql";
import {User} from '../entities/User'
import "reflect-metadata"
import { Context } from "../types/context";
import {Session} from '../entities/Session'
@Resolver()
export  class meResolver{
    @Query(()=>User,{nullable:true})
   async me(
       @Ctx(){req}:Context
       ):Promise<User|undefined>{
        
     if (!req.session.userId){
       console.log("couldnt find user id")
        return undefined
     }else{
      const id=req.session!.userId 
      const result= await User.findOne({where:{id}})
       return result
       
     }
    
    }
}