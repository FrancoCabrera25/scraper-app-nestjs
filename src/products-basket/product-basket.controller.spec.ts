import { Test, TestingModule } from '@nestjs/testing';
import { ProductsBasketController } from './product-basket.controller';
import { ProductsBasketService } from './product-basket.service';

describe('ProductsBasketController', () => {
  let controller: ProductsBasketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsBasketController],
      providers: [ProductsBasketService],
    }).compile();

    controller = module.get<ProductsBasketController>(ProductsBasketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
