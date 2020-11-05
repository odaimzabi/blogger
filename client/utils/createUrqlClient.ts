import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from '@urql/exchange-graphcache';
import betterUpdateQuery from "./betterUpdateQuery";
import { LoginUserMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from "../generated/generated";


export const createUrqlClient=(ssrExchange:any,_ctx:any)=>({
    url:"http://localhost:4000/graphql",
    fetchOptions:{
        credentials:"include" as const,
    },
    exchanges:[dedupExchange, cacheExchange({
            updates:{
                Mutation:{
                    login:(_result, _args, cache, _info)=>{
                        betterUpdateQuery<LoginUserMutation,MeQuery>(cache,{query:MeDocument},_result,(result,query)=>{
                    if (!result?.login){
                      return query;
                    }else {
                      return {
                        me:result?.login
                      }
                    }
                    
            }
          )
            
          },
          likePost:(_result,_args,cache,_info)=>{
          
          },
          logout:(_result, _args, cache, _info)=>{
            betterUpdateQuery<LogoutMutation,MeQuery>(cache,{query:MeDocument},_result,()=>({me:null}))
                         
                    
  },
    register:(_result, _args, cache, _info)=>{
      betterUpdateQuery<RegisterMutation,MeQuery>(cache,{query:MeDocument},_result,(result,query)=>{
        if (!result?.createUser){
          return query;
        }else {
          return {
            me:result?.createUser
          }
        }
        
}
)
    }

        }
  }
             
            
    }),fetchExchange,ssrExchange],
})