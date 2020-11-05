import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";



@Entity()
@ObjectType()
export class Like extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Post, (post) => post.Likes)
    post: Post;

    @Field()
    @Column()
    userId:number
    
    @Field()
    @Column({default:false})
    hasLiked: boolean;
}
