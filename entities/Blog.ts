import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()

export class Blog extends BaseEntity{

    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id?:number
    
    @Field()
    @Column()
    name?:string
    
}