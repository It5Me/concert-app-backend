import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      console.log('reflector', this.reflector);
      const requiredRoles = this.reflector.get<string[]>(
        'roles',
        context.getHandler(),
      );
      console.log('requiredRoles', requiredRoles);
      if (!requiredRoles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      console.log('user', user);
      return requiredRoles.some((role) => user.role?.includes(role));
    } catch (error) {
      console.error('Error in RolesGuard:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
