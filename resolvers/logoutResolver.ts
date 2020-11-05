import { Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "types/context";





@Resolver()
export class logoutResolver{
    @Mutation(()=>Boolean)
    logout(@Ctx()ctx:Context){
        return new Promise((res,rej)=>{
                ctx.req.session.destroy((err)=>{
                    if (err){
                        console.log(err)
                        rej(false)
                    }
                    ctx.res.clearCookie('qid')
                    res(true)
                })
        })
    }
}