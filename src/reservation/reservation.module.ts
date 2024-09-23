import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';

import { ConcertModule } from '../concert/concert.module';
import { ReservationsService } from './reservation.service';
import { ReservationsController } from './reservation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), ConcertModule],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationModule {}
