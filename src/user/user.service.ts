import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const user = this.userRepository.create({
      username,
      password,
      role: 'user',
    });
    return await this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async createAdmin(username: string, password: string): Promise<User> {
    const admin = this.userRepository.create({
      username,
      password,
      role: 'admin',
    });
    return await this.userRepository.save(admin);
  }
}
