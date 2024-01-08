import { Controller } from '@nestjs/common';
import { ProductsBasketService } from './product-basket.service';

@Controller('products-basket')
export class ProductsBasketController {
  constructor(private readonly productsBasketService: ProductsBasketService) {}
}
