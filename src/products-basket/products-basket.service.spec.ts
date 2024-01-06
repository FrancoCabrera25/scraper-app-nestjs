import { Test, TestingModule } from '@nestjs/testing';
import { ProductsBasketService } from './products-basket.service';

describe('ProductsBasketService', () => {
  let service: ProductsBasketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsBasketService],
    }).compile();

    service = module.get<ProductsBasketService>(ProductsBasketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
