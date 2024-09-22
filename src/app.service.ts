import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AppService {
  @UseGuards(AuthGuard('jwt'))
  getHello(): string {
    return 'Hello World!';
  }
}
