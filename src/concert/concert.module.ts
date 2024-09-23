import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './concert.entity';
import { ConcertsController } from './concert.controller';
import { ConcertService } from './concert.service';

@Module({
  imports: [TypeOrmModule.forFeature([Concert])],
  providers: [ConcertService],
  controllers: [ConcertsController],
  exports: [TypeOrmModule],
})
export class ConcertModule {}
