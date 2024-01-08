import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('runUpdateProducts')
  updatePriceProducts() {
    return this.productsService.updatePriceProducts();
  }
  @Get()
  findAll() {
    //return this.productsService.findAll();
  }
}
