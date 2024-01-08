import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
import { INITIAL_DATA_SEED } from '../data/data-seed';
import { ProductBasket } from '../products-basket/entities/product-basket.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(ProductBasket.name)
    private readonly productBasketModel: Model<ProductBasket>,
  ) {}
  async executeSeed() {
    await this.productModel.deleteMany({});
    await this.productBasketModel.deleteMany({});
    await this.productModel.insertMany(INITIAL_DATA_SEED);

    return 'Seed execueted';
  }
}
