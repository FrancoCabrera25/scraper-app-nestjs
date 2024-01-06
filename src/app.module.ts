import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapperModule } from './scrapper/scrapper.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './products/product.module';
import { ProductsBasketModule } from './products-basket/products-basket.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ScrapperModule,
    ProductModule,
    ProductsBasketModule,
    MongooseModule.forRoot(process.env.MONGODB),
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
