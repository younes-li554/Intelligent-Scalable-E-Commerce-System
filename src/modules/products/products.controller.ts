import { Controller, Post, Get, Body, Query, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() body: any) {
    return this.productsService.create(body);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.productsService.findAll(Number(page), Number(limit));
  }

  @Patch('inventory')
  updateInventory(@Body() body: any) {
    return this.productsService.updateInventory(
      body.productId,
      body.quantity,
    );
  }
}