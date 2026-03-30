import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, PaymentStatus } from './payments.entity';
import { Order, OrderStatus } from '../orders/orders.entity';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private queueService: QueueService,
  ) {}

  async createPayment(orderId: number, amount: number, idempotencyKey: string) {
    const existing = await this.paymentRepo.findOne({ where: { idempotencyKey } });
    if (existing) return existing;

    
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) throw new BadRequestException('Order not found');

    const payment = this.paymentRepo.create({ order, amount, idempotencyKey, status: PaymentStatus.SUCCESS });
    await this.paymentRepo.save(payment);

    if (order.status !== OrderStatus.CONFIRMED) {
      order.status = OrderStatus.CONFIRMED;
      await this.orderRepo.save(order);
    }

    await this.queueService.addJob('sendEmail', { orderId: order.id, paymentId: payment.id });

    return payment;
  }
}