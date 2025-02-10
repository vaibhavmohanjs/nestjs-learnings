import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findAll(): Promise<User[] | undefined> {
    return this.userRepository.find();
  }

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ username, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    if (user) {
      return bcrypt.compare(password, user.password);
    }
    return false;
  }

  async updateRefreshToken(userId: number, refreshToken: string | null) {
    await this.userRepository.update(userId, { refreshToken });
  }
  
  async findById(userId: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
  
}