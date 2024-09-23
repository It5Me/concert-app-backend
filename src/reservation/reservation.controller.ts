import { Controller, Post, Param, Get } from '@nestjs/common';
import { ReservationsService } from './reservation.service';

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

  @Get('user/:userId')
  getUserReservations(@Param('userId') userId: number) {
    return this.reservationsService.getUserReservations(userId);
  }
}
