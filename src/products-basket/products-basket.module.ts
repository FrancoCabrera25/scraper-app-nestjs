import { Module } from '@nestjs/common';
import { ProductsBasketService } from './products-basket.service';
import { ProductsBasketController } from './products-basket.controller';

@Module({
  controllers: [ProductsBasketController],
  providers: [ProductsBasketService]
})
export class ProductsBasketModule {}
