import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
import { INITIAL_DATA_SEED } from '../data/data-seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}
  async executeSeed() {
    await this.productModel.insertMany(INITIAL_DATA_SEED);
  }
}
