import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductModule } from '../products/product.module';
import { ProductBasketModule } from '../products-basket/product-basket.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ProductModule, ProductBasketModule],
})
export class SeedModule {}
