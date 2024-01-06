import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsBasketService } from './products-basket.service';
import { CreateProductsBasketDto } from './dto/create-products-basket.dto';
import { UpdateProductsBasketDto } from './dto/update-products-basket.dto';

@Controller('products-basket')
export class ProductsBasketController {
  constructor(private readonly productsBasketService: ProductsBasketService) {}

  @Post()
  create(@Body() createProductsBasketDto: CreateProductsBasketDto) {
    return this.productsBasketService.create(createProductsBasketDto);
  }

  @Get()
  findAll() {
    return this.productsBasketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsBasketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsBasketDto: UpdateProductsBasketDto) {
    return this.productsBasketService.update(+id, updateProductsBasketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsBasketService.remove(+id);
  }
}
