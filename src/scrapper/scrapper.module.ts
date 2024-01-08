import { Module } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ScrapperController } from './scrapper.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ScrapperController],
  providers: [ScrapperService],
  exports: [ScrapperService],
  imports: [ConfigModule.forRoot()],
})
export class ScrapperModule {}
