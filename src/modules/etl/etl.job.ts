import { Injectable, Logger } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class ETLJob {
  private readonly logger = new Logger(ETLJob.name);

  constructor(private readonly productsService: ProductsService) {}

  async processData(): Promise<void> {
    this.logger.log('Starting ETL batch job...');

    
    const rawData = await this.fetchData();
    this.logger.log(`Fetched ${rawData.data.length} records.`);

    
    const transformedData = this.transformData(rawData.data);
    this.logger.log('Data transformed successfully.');

    
    await this.loadData(transformedData);
    this.logger.log('ETL batch job completed.');
  }

  private async fetchData() {
   
    const page = 1;
    const limit = 1000;
    return this.productsService.findAll(page, limit);
  }

  private transformData(data: any[]): any[] {
    return data.map(item => ({
      id: item.id,
      quantity: item.inventory?.quantity ?? 0, 
      processedAt: new Date(),
      transformedQuantity: item.inventory?.quantity ? item.inventory.quantity + 10 : 10, 
    }));
  }

  private async loadData(data: any[]): Promise<void> {
    for (const item of data) {
      try {
        await this.productsService.updateInventory(item.id, item.transformedQuantity);
        this.logger.log(`Updated product ${item.id} quantity to ${item.transformedQuantity}`);
      } catch (error) {
        this.logger.error(`Failed to update product ${item.id}: ${error.message}`);
      }
    }
  }
}