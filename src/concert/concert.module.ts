import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './concert.entity';
import { ConcertsController } from './concert.controller';
import { ConcertService } from './concert.service';
import { Reservation } from 'src/reservation/reservation.entity';
import { ReservationModule } from 'src/reservation/reservation.module';
import { ReservationsService } from 'src/reservation/reservation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Concert, Reservation]),
    ReservationModule,
  ],
  providers: [ConcertService, ReservationsService],
  controllers: [ConcertsController],
  exports: [TypeOrmModule],
})
export class ConcertModule {}
