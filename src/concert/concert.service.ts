import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from './concert.entity';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
  ) {}

  async getAllConcerts(): Promise<Concert[]> {
    return this.concertRepository.find();
  }
}
