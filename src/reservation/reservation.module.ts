import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ReservationsService } from './reservation.service';
import { ReservationsController } from './reservation.controller';
import { Concert } from '../concert/concert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Concert])],
  providers: [ReservationsService],
  controllers: [ReservationsController],
  exports: [TypeOrmModule],
})
export class ReservationModule {}
