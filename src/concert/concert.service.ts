import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from './concert.entity';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
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

  async deleteConcert(id: number): Promise<void> {
    const result = await this.concertRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }
  }

  async getAllConcerts(): Promise<Concert[]> {
    return this.concertRepository.find();
  }

  async getConcertById(id: number): Promise<Concert> {
    const concert = await this.concertRepository.findOne({ where: { id } });
    if (!concert) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }
    return concert;
  }
}
