import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './concert.entity';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { Reservation } from '../reservation/reservation.entity';
import { ReservationModule } from '../reservation/reservation.module';
import { ReservationsService } from '../reservation/reservation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Concert, Reservation]),
    ReservationModule,
  ],
  providers: [ConcertService, ReservationsService],
  controllers: [ConcertController],
  exports: [TypeOrmModule],
})
export class ConcertModule {}
