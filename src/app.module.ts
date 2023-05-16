import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './api/cart/cart.module';
import { AuthModule } from './api/auth/auth.module';
import { OrderModule } from './api/order/order.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {
}
