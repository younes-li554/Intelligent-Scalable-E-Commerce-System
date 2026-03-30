import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CacheService } from '../cache/cache.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService, CacheService],
  controllers: [ProductsController],
  exports: [ProductsService, TypeOrmModule], 
})
export class ProductsModule {}