import { Module } from '@nestjs/common';
import { AIService } from './ai.service';
import { AIController } from './ai.controller';
import { CacheService } from '../cache/cache.service';

@Module({
  providers: [AIService, CacheService], 
  controllers: [AIController],
  exports: [AIService],
})
export class AIServiceModule {}