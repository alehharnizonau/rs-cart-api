import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './services';
import { DatabaseModule } from '../../database/database.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [DatabaseModule, ProductModule],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {
}
