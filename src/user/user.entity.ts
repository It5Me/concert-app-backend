import { Reservation } from 'src/reservation/reservation.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: 'user' | 'admin';

  @OneToMany(() => Reservation, (reservation) => reservation.user, {
    cascade: true,
  })
  reservations: Reservation[];
}
