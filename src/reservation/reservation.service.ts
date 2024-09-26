import { Injectable, NotFoundException } from '@nestjs/common';
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
    const existingReservation = await this.reservationRepository.findOne({
      where: { concert: { id: concertId }, user: { id: userId } },
    });

    if (existingReservation && existingReservation.action === 'reserved') {
      throw new Error('User has already reserved a seat for this concert');
    }

    if (existingReservation && existingReservation.action === 'canceled') {
      existingReservation.action = 'reserved';

      const concert = await this.concertRepository.findOne({
        where: { id: concertId },
      });
      if (!concert) {
        throw new Error('Concert not found');
      }

      if (concert.totalSeats <= 0) {
        throw new Error('No available seats for this concert');
      }

      concert.totalSeats--;
      await this.concertRepository.save(concert);

      await this.reservationRepository.save(existingReservation);
      return { message: 'Reservation updated to active' };
    }

    const concert = await this.concertRepository.findOne({
      where: { id: concertId },
    });
    if (!concert) {
      throw new Error('Concert not found');
    }

    if (concert.totalSeats <= 0) {
      throw new Error('No available seats for this concert');
    }

    const newReservation = this.reservationRepository.create({
      concert: concert,
      user: { id: userId },
      action: 'reserved',
    });

    concert.totalSeats--;

    await this.concertRepository.save(concert);
    return this.reservationRepository.save(newReservation);
  }

  async getUserReservations(userId: number) {
    return this.reservationRepository.find({
      where: { user: { id: userId } },
      relations: ['concert'],
    });
  }

  async getReservationsWithDetails() {
    return this.reservationRepository.find({
      relations: ['user', 'concert'],
      select: ['createdAt', 'action'],
    });
  }

  async cancelReservation(concertId: number, userId: number) {
    const existingReservation = await this.reservationRepository.findOne({
      where: {
        concert: { id: concertId },
        user: { id: userId },
        action: 'reserved',
      },
      relations: ['concert', 'user'],
    });

    if (!existingReservation) {
      throw new NotFoundException('No active reservation found to cancel');
    }

    existingReservation.action = 'canceled';
    await this.reservationRepository.save(existingReservation);

    const concert = existingReservation.concert;

    concert.reservedSeats = Math.max(0, concert.reservedSeats - 1);
    concert.totalSeats += 1;

    await this.concertRepository.save(concert);

    return { message: 'Reservation canceled successfully' };
  }

  async getReservationsByConcertId(concertId: number): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.find({
      where: { concert: { id: concertId } },
      relations: ['concert'],
    });

    return reservations;
  }
}
