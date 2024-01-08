import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapperModule } from './scrapper/scrapper.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './products/product.module';
import { ProductBasketModule } from './products-basket/product-basket.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    ScrapperModule,
    ProductModule,
    ProductBasketModule,
    MongooseModule.forRoot(process.env.MONGODB),
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
