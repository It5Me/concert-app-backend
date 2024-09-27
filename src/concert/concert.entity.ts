import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Reservation } from '../reservation/reservation.entity';

@Entity()
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  totalSeats: number;

  @Column({ type: 'int', default: 0 })
  reservedSeats: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.concert, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  reservations: Reservation[];
}
