
import { ObjectType,ID,Field,Int} from 'type-graphql'
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from "typeorm"
import { Like } from './Like';

@ObjectType()
@Entity()
export class User extends BaseEntity{
    
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id?:number

    @Field()
    @Column()
    username?:string;
    
    

    @Field()
    @Column()
    password?:string;

}