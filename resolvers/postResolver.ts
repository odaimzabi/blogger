import {Arg, Ctx, Mutation, Query, Resolver} from 'type-graphql'
import { Context } from '../types/context'
import {Post} from '../entities/Post'
import { Comment } from "../entities/Comment";
import { Blog } from '../entities/Blog';
import { Like } from '../entities/Like';
import { User } from '../entities/User';

//blog:id 
//fetchpost->fetch posts based on the id of the blog
//constraints on blog id 
//check if the blog exists first then fetch it 
// how to return an array of objects in typescript+typeorm

@Resolver()
export class PostResolver{
    @Mutation(()=>Post)
    async createPost(
    @Arg('title')title:string,
    @Arg('details')details:string,
    @Arg('blogId')blogId:number,
    @Ctx(){req}:Context
    ){
        if (!req.session.userId){
            return false;
        }
        const response=await Post.create({
            userId:req.session.userId,
            title:title,
            details:details,
            blogId:blogId,
            comments:[],
            Likes:[]
        }).save()
        console.log(response)

        if (!response){
            return null
        }
        return response

    }
    @Query(()=>[Post],{nullable:true})
    async fetchPosts(@Ctx(){req}:Context,@Arg('blogId')blogId:number,@Arg('postId',{nullable:true})id:number){
        const userId=req.session.userId
        if (!req.session.userId){
            return null
        }
        const response= await Post.find({where:{blogId},relations:['comments','Likes']})
        console.log("response=",response)
        if (!response){
            return null
        }
        return response
    }
    @Query(()=>Post,{nullable:true})
    async fetchPost(@Ctx(){req}:Context,@Arg('postId',{nullable:true})id:number){
        const userId=req.session.userId
        if (!userId){
            return null
        }
        const response= await Post.findOne({where:{id},relations:['comments','Likes']})
        console.log("response=",response)
        if (!response){
            return null
        }
        return response
    }

    @Query(()=>[Comment],{nullable:true})
    async fetchComment(@Ctx(){req}:Context,@Arg('blogId')blogId:number,@Arg('postId')postId:number){
        const userId=req.session.userId
        if (!req.session.userId){
            return null
        }
        const response= await Comment.find({where:{blogId,postId}})
        console.log("response=",response)
        if (!response){
            return null
        }
        return response
    }
    @Mutation(()=>Post,{nullable:true})
    async postComment(@Ctx(){req}:Context,@Arg('details')details:string,@Arg('blogId')blogId:number,@Arg('postId')id:number){

        const userId=req.session.userId

            if (!userId){
                return null
            }
            const findPost=await Post.findOne({where:{blogId,id},relations:['comments']})
            const user=await User.findOne({where:{id:userId}})
            const comment=new Comment()
            comment.blogId=blogId
            comment.details=details
            comment.username=user?.username
            findPost?.comments?.push(comment)
            console.log(findPost)
            const result =await Post.create(findPost).save()
            return result
    }

    @Mutation(()=>Blog,{nullable:true})
    async createBlog(@Arg('name')name:string){
        const result=await Blog.create({name:name}).save()
        if (!result){
            return null
        }
        return result
    }
    @Query(()=>Boolean)
    async deletePost(@Ctx(){req}:Context){
        const userId=req.session.userId
        if (!req.session.userId){
            return null
        }

        await Comment.clear()
        await Like.clear()
        await Post.clear()
      
        return true
        
    }

    // []=> null 
    //  case 1: if the array is empty,just put the like inside
    // case 2 : if the array is not empty,check if the like of the user exist and check hasChecked
    // case 3: the array is not empty but the like does not exist,put the like inside 
    @Mutation(()=>Like,{nullable:true})
    async likePost(@Ctx(){req}:Context,@Arg('postId')id:number){
            if (!req.session.userId){
                return null;
            }
            let userId=req.session.userId;
            const result=await Post.findOne({where:{id},relations:['Likes']})
            // if (result?.Likes==[]){
            //     console.log("HELLOOOOOOOOOO")
            //     const like=new Like()
            //     like.user.id=userId
            //     like.hasLiked=true
            //     like.post.id=id
            //     console.log(like)
            //     result?.Likes?.push(like)
            //     console.log("result=>",result.Likes)
            //     const res=Post.create(result).save()
            //     return res
            // }else if (result.Likes!=[]) {
            //     result?.Likes.forEach((item)=>{
            //         console.log("ITEM=>",item)
            //         if (item.user.id==userId){
            //             item.hasLiked=!item.hasLiked
            //             return item
            //         }
            //     })
            //     const res=await Post.create(result).save()
            //     return res
            // }
            const like=new Like()
            like.hasLiked=true
            like.userId=userId

                if (result.Likes!=[]){
                    console.log("array not empty!!")
                    let test:boolean=false
                    result.Likes.map(item=>{
                        if (item.userId==userId){
                            item.hasLiked=!item.hasLiked
                            like.hasLiked=item.hasLiked
                            test=true
                        }
                    })
                    if (test){
                    await Post.create(result).save()
                    return like
                    }else {
                        result.Likes.push(like)
                        await Post.create(result).save()
                        return like
                    }

                }else if (result.Likes==[]){
                result.Likes?.push(like)
                 await Post.create(result).save()
                return like
                }
           
    }
}