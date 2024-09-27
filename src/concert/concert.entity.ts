import { Reservation } from 'src/reservation/reservation.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.concert, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  reservations: Reservation[];
}
