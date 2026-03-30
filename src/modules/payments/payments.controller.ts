import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPayment(@Body() body: { orderId: number; amount: number; idempotencyKey: string }) {
    return this.paymentsService.createPayment(body.orderId, body.amount, body.idempotencyKey);
  }

  
}