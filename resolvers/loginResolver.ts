import { User } from "../entities/User"
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Context } from "../types/context"
import { Session } from "../entities/Session"


@Resolver()
export class LoginResolver{
@Query(()=>String)
hello(){
    return "hello"
}
 @Mutation(()=>User,{nullable:true})
 async login(
   @Arg('username')username:string,
   @Arg('password')password:string,
   @Ctx() {req}:Context){

   const result=await User.findOne({where:{username}})
        // console.log(result)
   if (!result){
     return null
   }
      req.session.userId=result.id
     return result
 }
}