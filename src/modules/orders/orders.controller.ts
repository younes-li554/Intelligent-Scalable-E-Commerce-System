import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import type { Request } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Req() req: Request, @Body() body: { items: { productId: number; quantity: number }[], idempotencyKey: string }) {
    const user = req.user as any;
    return this.ordersService.createOrder(user, body.items, body.idempotencyKey);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getOrders(@Req() req: Request) {
    const user = req.user as any;
    return this.ordersService.getOrdersByUser(user);
  }
}