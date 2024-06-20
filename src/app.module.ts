import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, ProductModule, CartModule, OrderModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
