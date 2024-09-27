import { Test, TestingModule } from '@nestjs/testing';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { CreateConcertDto } from './dto/create-concert.dto';
import { HttpException } from '@nestjs/common';

describe('ConcertController', () => {
  let controller: ConcertController;
  let service: ConcertService;

  const mockConcertService = {
    getConcerts: jest.fn(),
    getConcertById: jest.fn(),
    createConcert: jest.fn(),
    deleteConcert: jest.fn(),
    findReservationsByConcertId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertController],
      providers: [
        {
          provide: ConcertService,
          useValue: mockConcertService,
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue(jest.fn(() => true))
      .overrideGuard(RolesGuard)
      .useValue(jest.fn(() => true))
      .compile();

    controller = module.get<ConcertController>(ConcertController);
    service = module.get<ConcertService>(ConcertService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getConcerts', () => {
    it('should call getConcerts with correct pagination parameters', async () => {
      await controller.getConcerts('1', '10');
      expect(service.getConcerts).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('getConcertById', () => {
    it('should call getConcertById with correct id', async () => {
      const concertId = 1;
      await controller.getConcertById(concertId);
      expect(service.getConcertById).toHaveBeenCalledWith(concertId);
    });
  });

  describe('createConcert', () => {
    it('should call createConcert with correct concert data', async () => {
      const dto: CreateConcertDto = {
        name: 'concert 1',
        description: 'concert description',
        totalSeats: 400,
      };
      await controller.createConcert(dto);
      expect(service.createConcert).toHaveBeenCalledWith(dto);
    });
  });

  describe('deleteConcert', () => {
    it('should call deleteConcert with correct id', async () => {
      const concertId = 1;
      await controller.deleteConcert(concertId);
      expect(service.deleteConcert).toHaveBeenCalledWith(concertId);
    });

    it('should throw an HttpException if service throws an error', async () => {
      const concertId = 1;
      jest
        .spyOn(service, 'deleteConcert')
        .mockRejectedValueOnce(new Error('Concert not found'));
      await expect(controller.deleteConcert(concertId)).rejects.toThrow(
        HttpException,
      );
      expect(service.deleteConcert).toHaveBeenCalledWith(concertId);
    });
  });

  describe('getConcertAndReservation', () => {
    it('should call findReservationsByConcertId with correct id', async () => {
      const concertId = 1;
      await controller.getConcertAndReservation(concertId);
      expect(service.findReservationsByConcertId).toHaveBeenCalledWith(
        concertId,
      );
    });
  });
});
