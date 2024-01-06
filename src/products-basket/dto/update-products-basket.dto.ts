import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsBasketDto } from './create-products-basket.dto';

export class UpdateProductsBasketDto extends PartialType(CreateProductsBasketDto) {}
