import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from '../auth/roles.enum';

@ObjectType() 
@Entity()
export class User {
  @Field(() => Int)  // Expose this field in GraphQL
  @PrimaryGeneratedColumn()
  id: number;

  @Field()  // Expose this field in GraphQL
  @Column({ nullable: false })
  email: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ nullable: true })
  refreshToken: string;  // Store hashed refresh token

  @Field()
  @Column({ type: 'enum', enum: Role, default: Role.USER })  
  role: Role;
}