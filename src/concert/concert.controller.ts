import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('concerts')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class ConcertController {
  @Get()
  @Roles('user')
  getAllConcerts() {
    return 'This is a route accessible to all authenticated users';
  }

  @Get('admin')
  @Roles('admin')
  getAdminConcerts() {
    return 'This is an admin-only route';
  }
}
