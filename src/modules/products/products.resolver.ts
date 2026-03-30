import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';  // إضافة Float هنا
import { ProductsService } from './products.service';  
import { Product } from './products.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })  
  async getProducts(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    return this.productsService.findAll(page, limit);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('name') name: string,
    @Args('price', { type: () => Float }) price: number,
    @Args('description') description: string,
  ) {
    return this.productsService.create({ name, price, description });
  }
}