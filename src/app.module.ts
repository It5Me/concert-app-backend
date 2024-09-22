import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ConcertModule } from './concert/concert.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { Concert } from './concert/concert.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'pass1234',
      database: 'concert_db',
      entities: [User, Concert],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'jwtforauth',
      signOptions: { expiresIn: '60m' },
    }),
    AuthModule,
    UserModule,
    ConcertModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
