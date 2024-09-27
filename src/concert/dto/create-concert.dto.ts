// src/concert/dto/create-concert.dto.ts

import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateConcertDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsInt()
  @Min(1)
  readonly totalSeats: number;
}
