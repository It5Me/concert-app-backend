import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservation.controller';
import { ReservationsService } from './reservation.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Reflector } from '@nestjs/core';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let service: ReservationsService;

  const mockReservationsService = {
    reserveSeat: jest.fn(),
    getReservationsByConcertId: jest.fn(),
    getUserReservations: jest.fn(),
    getReservationsWithDetails: jest.fn(),
    cancelReservation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        {
          provide: ReservationsService,
          useValue: mockReservationsService,
        },
        Reflector,
        {
          provide: AuthGuard('jwt'),
          useValue: jest.fn().mockImplementation(() => true),
        },
        {
          provide: RolesGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call reserveSeat on the service when reserveSeat is called', async () => {
    const concertId = 1;
    const userId = 2;
    await controller.reserveSeat(concertId, userId);
    expect(service.reserveSeat).toHaveBeenCalledWith(concertId, userId);
  });

  it('should call getReservationsByConcertId on the service when getReservationsByConcertId is called', async () => {
    const concertId = 1;
    await controller.getReservationsByConcertId(concertId);
    expect(service.getReservationsByConcertId).toHaveBeenCalledWith(concertId);
  });

  it('should call getUserReservations on the service when getUserReservations is called', async () => {
    const userId = 2;
    await controller.getUserReservations(userId);
    expect(service.getUserReservations).toHaveBeenCalledWith(userId);
  });

  it('should call getReservationsWithDetails on the service when getAllReservationsForAdmin is called', async () => {
    await controller.getAllReservationsForAdmin();
    expect(service.getReservationsWithDetails).toHaveBeenCalled();
  });

  it('should call cancelReservation on the service when cancelReservation is called', async () => {
    const concertId = 1;
    const userId = 2;
    await controller.cancelReservation(concertId, userId);
    expect(service.cancelReservation).toHaveBeenCalledWith(concertId, userId);
  });
});
