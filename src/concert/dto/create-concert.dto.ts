// src/concert/dto/create-concert.dto.ts
import { IsString, IsInt, Min } from 'class-validator';

export class CreateConcertDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsInt()
  @Min(1)
  readonly totalSeats: number;
}
