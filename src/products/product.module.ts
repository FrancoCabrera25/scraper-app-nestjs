import { Module } from '@nestjs/common';
import { ProductsService as ProductService } from './product.service';
import { ProductsController as ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';

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
  ],
  exports: [MongooseModule],
})
export class ProductModule {}
