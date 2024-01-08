import { Module } from '@nestjs/common';
import { ProductsService as ProductService } from './product.service';
import { ProductsController as ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ScrapperModule } from '../scrapper/scrapper.module';
import { ProductBasketModule } from '../products-basket/product-basket.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    ScrapperModule,
    ProductBasketModule,
  ],
  exports: [MongooseModule],
})
export class ProductModule {}
