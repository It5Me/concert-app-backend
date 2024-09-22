import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  @ApiBody({
    schema: {
      example: {
        username: 'user',
        password: 'pass',
      },
    },
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(
      createUserDto.username,
      createUserDto.password,
    );
    return { message: 'User created successfully', user };
  }

  @Post('create-admin')
  @ApiBody({
    schema: {
      example: {
        username: 'admin',
        password: 'pass',
      },
    },
  })
  async createAdmin(@Body() body: { username: string; password: string }) {
    return this.userService.createAdmin(body.username, body.password);
  }
}
