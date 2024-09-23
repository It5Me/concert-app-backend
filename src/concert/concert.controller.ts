import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('concerts')
export class ConcertsController {
  constructor(private concertsService: ConcertService) {}

  @Get()
  getAllConcerts() {
    return this.concertsService.getAllConcerts();
  }

  @Get(':id')
  getConcertById(@Param('id') id: number) {
    return this.concertsService.getConcertById(id);
  }

  @Post('create')
  @ApiBody({ type: CreateConcertDto })
  @ApiBody({
    schema: {
      example: {
        name: 'concert 1',
        description: 'concert description',
        totalSeats: 400,
      },
    },
  })
  createConcert(@Body() concertData: CreateConcertDto) {
    return this.concertsService.createConcert(
      concertData.name,
      concertData.description,
      concertData.totalSeats,
    );
  }

  @Delete(':id')
  deleteConcert(@Param('id') id: number) {
    return this.concertsService.deleteConcert(id);
  }
}
