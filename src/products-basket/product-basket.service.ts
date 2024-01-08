import { Injectable } from '@nestjs/common';
import { ProductBasket } from './entities/product-basket.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { calculateVariation } from '../utils/calculate-variation-price';

@Injectable()
export class ProductsBasketService {
  constructor(
    @InjectModel(ProductBasket.name)
    private readonly productBasketModel: Model<ProductBasket>,
  ) {}
  async create(totalPrice: number) {
    try {
      const latestProductBasket = await this.getLatestProductBasket();
      let variationResult = 0;
      let accumulatedVariation = 0;
      if (latestProductBasket !== null) {
        variationResult = calculateVariation(
          totalPrice,
          latestProductBasket.totalPrice,
        );
        accumulatedVariation =
          latestProductBasket.accumulatedVariation + variationResult;
      }

      await this.productBasketModel.create({
        totalPrice,
        date: new Date(),
        variation: variationResult,
        accumulatedVariation,
      });
    } catch (error) {
      console.error('Save basket prodcuts', error);
    }
    return 'This action adds a new productsBasket';
  }

  async getLatestProductBasket(): Promise<ProductBasket | null> {
    // Utiliza el método findOne para obtener el documento más reciente
    const latestProductBasket = await this.productBasketModel
      .findOne({})
      .sort({ date: 'desc' });

    return latestProductBasket;
  }
}
