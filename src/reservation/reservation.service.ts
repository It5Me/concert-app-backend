import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reservation } from './reservation.entity';
import { Concert } from 'src/concert/concert.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
  ) {}

  async reserveSeat(concertId: number, userId: number) {
    const concert = await this.concertRepository.findOne({
      where: { id: concertId },
    });
    if (!concert || concert.reservedSeats >= concert.totalSeats) {
      throw new Error('No seats available or concert not found');
    }

    const existingReservation = await this.reservationRepository.findOne({
      where: { concert: { id: concertId }, userId },
    });

    if (existingReservation) {
      throw new Error('User has already reserved a seat for this concert');
    }

    const reservation = this.reservationRepository.create({
      concert,
      userId,
    });

    concert.reservedSeats++;
    await this.concertRepository.save(concert);

    return this.reservationRepository.save(reservation);
  }

  async getUserReservations(userId: number) {
    return this.reservationRepository.find({
      where: { user: { id: userId } },
      relations: ['concert'],
    });
  }
}
