import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private cacheService: CacheService,
  ) {}

  async create(data: any) {
    const product = this.productRepo.create(data);
    const saved = await this.productRepo.save(product);

    await this.cacheService.del('products');

    return saved;
  }

  async findAll(page: number, limit: number) {
    const cacheKey = `products_${page}_${limit}`;

    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const [data, total] = await this.productRepo.findAndCount({
      relations: ['inventory'],
      skip: (page - 1) * limit,
      take: limit,
    });

    const result = { data, total };

    await this.cacheService.set(cacheKey, result);

    return result;
  }

  async updateInventory(productId: number, quantity: number) {  
    const product = await this.productRepo.findOne({
      where: { id: productId },  
      relations: ['inventory'],
    });

    if (!product) throw new BadRequestException('Product not found');

    if (quantity < 0)
      throw new BadRequestException('Quantity cannot be negative');

    product.inventory.quantity = quantity;

    await this.productRepo.save(product);

    await this.cacheService.del('products');

    return product;
  }
}