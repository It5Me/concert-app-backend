import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './concert.entity';
import { ConcertController } from './concert.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Concert])],
  providers: [],
  controllers: [ConcertController],
})
export class ConcertModule {}
