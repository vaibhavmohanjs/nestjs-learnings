import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../auth/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;  // Store hashed refresh token

  @Column({ type: 'enum', enum: Role, default: Role.USER })  
  role: Role;
}