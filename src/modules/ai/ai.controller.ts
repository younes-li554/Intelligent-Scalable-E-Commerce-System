import { Controller, Post, Body } from '@nestjs/common';
import { AIService } from './ai.service';

@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('generate-description')
  async generateDescription(@Body('name') name: string) {
    return this.aiService.generateProductDescription(name);
  }
}

