import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  totalSeats: number;

  @Column({ default: 0 })
  reservedSeats: number;
}
