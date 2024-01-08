import { Module } from '@nestjs/common';
import { ProductsBasketService as ProductBasketService } from './product-basket.service';
import { ProductsBasketController as ProductBasketController } from './product-basket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductBasket,
  ProductBasketSchema,
} from './entities/product-basket.entity';

@Module({
  controllers: [ProductBasketController],
  providers: [ProductBasketService],
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductBasket.name,
        schema: ProductBasketSchema,
      },
    ]),
  ],
  exports: [ProductBasketService, MongooseModule],
})
export class ProductBasketModule {}
