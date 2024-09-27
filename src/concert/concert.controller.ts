import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { ApiBody } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('concerts')
export class ConcertsController {
  constructor(private concertsService: ConcertService) {}

  @Get()
  @Roles('user', 'admin')
  getConcerts(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    return this.concertsService.getConcerts(pageNumber, limitNumber);
  }

  @Get(':id')
  getConcertById(@Param('id') id: number) {
    return this.concertsService.getConcertById(id);
  }

  @Post('create')
  @Roles('admin')
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
    return this.concertsService.createConcert(concertData);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteConcert(@Param('id') id: number) {
    try {
      return await this.concertsService.deleteConcert(id);
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: error.message },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get('/reservations/:id')
  getConcertAndReservation(@Param('id') id: number) {
    return this.concertsService.findReservationsByConcertId(id);
  }
}
