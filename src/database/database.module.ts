import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CartItems, Carts, Products, Stocks } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [Carts, CartItems, Products, Stocks],
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Carts, CartItems, Products, Stocks]),
  ],
  exports: [TypeOrmModule],
})

export class DatabaseModule {
}