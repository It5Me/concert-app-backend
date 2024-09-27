import { Controller, Post, Param, Get, Patch, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservation.service';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('reservetion')
@ApiBearerAuth('JWT-auth')
@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Post(':concertId/user/:userId')
  reserveSeat(
    @Param('concertId') concertId: number,
    @Param('userId') userId: number,
  ) {
    return this.reservationsService.reserveSeat(concertId, userId);
  }

  @Get('/concert/:id')
  getReservationsByConcertId(@Param('id') concertId: number) {
    return this.reservationsService.getReservationsByConcertId(concertId);
  }

  @Get('user/:userId')
  getUserReservations(@Param('userId') userId: number) {
    return this.reservationsService.getUserReservations(userId);
  }

  @Roles('admin')
  @Get('admin/reservations')
  getAllReservationsForAdmin() {
    return this.reservationsService.getReservationsWithDetails();
  }

  @Patch(':concertId/user/:userId/cancel')
  cancelReservation(
    @Param('concertId') concertId: number,
    @Param('userId') userId: number,
  ) {
    return this.reservationsService.cancelReservation(concertId, userId);
  }
}
