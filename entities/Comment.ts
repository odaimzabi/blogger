import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";





@ObjectType()
@Entity()
export class Comment extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id?: number;

    @Field({nullable:true})
    @Column()
    details:string;

    @Field()
    @Column()
    username:string;

    @Field()
    @Column()
    blogId: number;

    @ManyToOne(()=>Post,(post)=>post.comments)
    post: Post;
}
