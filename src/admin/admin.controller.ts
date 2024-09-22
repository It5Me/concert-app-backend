import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)
export class AdminController {
  @Roles('admin')
  @Get('dashboard')
  getAdminDashboard() {
    return 'This is the admin dashboard';
  }

  @Roles('admin')
  @Get('stats')
  getAdminStats() {
    return 'Admin stats...';
  }
}
