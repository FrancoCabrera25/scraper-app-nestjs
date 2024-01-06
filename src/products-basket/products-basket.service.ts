import { Injectable } from '@nestjs/common';
import { CreateProductsBasketDto } from './dto/create-products-basket.dto';
import { UpdateProductsBasketDto } from './dto/update-products-basket.dto';

@Injectable()
export class ProductsBasketService {
  create(createProductsBasketDto: CreateProductsBasketDto) {
    return 'This action adds a new productsBasket';
  }

  findAll() {
    return `This action returns all productsBasket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsBasket`;
  }

  update(id: number, updateProductsBasketDto: UpdateProductsBasketDto) {
    return `This action updates a #${id} productsBasket`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsBasket`;
  }
}
