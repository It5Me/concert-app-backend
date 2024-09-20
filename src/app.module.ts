import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'pass1234',
      database: 'concert_db',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
