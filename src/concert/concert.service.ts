/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from './concert.entity';
import { Reservation } from 'src/reservation/reservation.entity';
import { ReservationsService } from 'src/reservation/reservation.service';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,

    @InjectRepository(Concert)
    private reservationRepository: Repository<Reservation>,

    private readonly reservationService: ReservationsService,
  ) {}

  async createConcert(
    name: string,
    description: string,
    totalSeats: number,
  ): Promise<Concert> {
    const concert = this.concertRepository.create({
      name,
      description,
      totalSeats,
    });
    return this.concertRepository.save(concert);
  }

  async deleteConcert(concertId: number) {
    return this.concertRepository.delete({ id: concertId });
  }

  async getConcerts(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const [concerts, totalConcerts] = await this.concertRepository.findAndCount(
      {
        skip: offset,
        take: limit,
      },
    );

    const totalPages = Math.ceil(totalConcerts / limit);

    return {
      concerts,
      totalConcerts,
      currentPage: page,
      totalPages,
    };
  }

  async getConcertById(id: number): Promise<Concert> {
    const concert = await this.concertRepository.findOne({ where: { id } });
    if (!concert) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }
    return concert;
  }

  async findReservationsByConcertId(concertId: number): Promise<Reservation[]> {
    return this.reservationService.getReservationsByConcertId(concertId);
  }
}
