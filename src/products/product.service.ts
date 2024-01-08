import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model, Types } from 'mongoose';
import { ScrapperService } from '../scrapper/scrapper.service';
import { calculateVariation } from '../utils/calculate-variation-price';
import { ProductsBasketService } from '../products-basket/product-basket.service';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private scrapperService: ScrapperService,
    private productBasketService: ProductsBasketService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async updatePriceProducts() {
    let totalPrice = 0;
    try {
      console.log('INIT PROCESS');
      const productsList = await this.productModel.find({}).lean();

      for (const product of productsList) {
        const scrapperResult =
          await this.scrapperService.getDataProducstByPuppeteer(product.title);

        const variationResult = calculateVariation(
          parseFloat(scrapperResult.price),
          parseFloat(product.price),
        );
        const historyPriceUpdate = {
          price: parseFloat(scrapperResult.price).toFixed(2),
          date: new Date(),
        };
        await this.productModel.findOneAndUpdate(
          { _id: product._id }, // Filtro: Actualiza el documento con el mismo título
          {
            $set: {
              price: parseFloat(scrapperResult.price).toFixed(2),
              variation: variationResult,
              accumulatedVariation:
                product.accumulatedVariation + variationResult,
              lastUpdate: new Date(),
            },
            $push: { historyPrice: historyPriceUpdate },
          },
          { new: true },
        );
        totalPrice =
          totalPrice + Number(parseFloat(scrapperResult.price).toFixed(2));
      }
      await this.productBasketService.create(totalPrice);
      console.log('FIN PROCESS');
      return 'PROCESS UPDATED';
    } catch (error) {
      console.error('error', error);
    }
  }
}
