import { Concert } from '../concert/concert.entity';
import { User } from '../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Concert, (concert) => concert.reservations, {
    onDelete: 'CASCADE',
  })
  concert: Concert;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 'reserved' })
  action: 'reserved' | 'canceled';
}
