import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    createUser: jest.fn(),
    createAdmin: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should call createUser with correct parameters', async () => {
      const createUserDto: CreateUserDto = {
        username: 'user',
        password: 'pass',
      };
      const mockUser = { id: 1, username: 'user' };
      mockUserService.createUser.mockResolvedValue(mockUser);

      const result = await controller.createUser(createUserDto);

      expect(service.createUser).toHaveBeenCalledWith(
        createUserDto.username,
        createUserDto.password,
      );
      expect(result).toEqual({
        message: 'User created successfully',
        user: mockUser,
      });
    });
  });

  describe('createAdmin', () => {
    it('should call createAdmin with correct parameters', async () => {
      const body = { username: 'admin', password: 'pass' };
      const mockAdmin = { id: 1, username: 'admin', role: 'admin' };
      mockUserService.createAdmin.mockResolvedValue(mockAdmin);

      const result = await controller.createAdmin(body);

      expect(service.createAdmin).toHaveBeenCalledWith(
        body.username,
        body.password,
      );
      expect(result).toEqual(mockAdmin);
    });
  });
});
