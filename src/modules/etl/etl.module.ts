import { Module } from '@nestjs/common';
import { ETLJob } from './etl.job';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [ProductsModule],
  providers: [ETLJob],
  exports: [ETLJob],
  
})
export class ETLModule {}