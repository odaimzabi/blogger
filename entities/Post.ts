import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { Like } from "./Like";


@ObjectType()
@Entity()

export class Post extends BaseEntity{

    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id!:number


    @Field()
    @Column()
    userId!:number

    @Field()
    @Column()
    title?:string

    @Field()
    @Column()
    details?:string

    @Field(()=>[Comment],{nullable:true})
    @OneToMany(() => Comment, (Comment) => Comment.post,{cascade:true})
    comments:Comment[]

    @Field(()=>[Like],{nullable:true})
    @OneToMany(()=>Like,(Like)=>Like.post,{cascade:true})
    Likes:Like[]

    @Field()
    @Column()
    blogId?:number

}
