import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from './orders.entity';
import { OrderItem } from './order-items.entity';
import { Product } from '../products/products.entity';
import { User } from '../users/users.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  async createOrder(user: User, items: { productId: number; quantity: number }[], idempotencyKey: string) {
    const existing = await this.orderRepo.findOne({ where: { idempotencyKey } });
    if (existing) return existing;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = this.orderRepo.create({ user, status: OrderStatus.PENDING, idempotencyKey });
      await queryRunner.manager.save(order);

      for (const item of items) {
        const product = await queryRunner.manager.findOne(Product, { where: { id: item.productId }, relations: ['inventory'] });
        if (!product) throw new BadRequestException('Product not found');
        if (!product.inventory || product.inventory.quantity < item.quantity) throw new BadRequestException('Insufficient stock');

        product.inventory.quantity -= item.quantity;
        await queryRunner.manager.save(product.inventory);

        const orderItem = this.orderItemRepo.create({
          order,
          product,
          quantity: item.quantity,
          price: product.price,
        });
        await queryRunner.manager.save(orderItem);
      }

      order.status = OrderStatus.CONFIRMED;
      await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();
      return order;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getOrdersByUser(user: User) {
    return this.orderRepo.find({ where: { user }, relations: ['items', 'items.product'] });
  }
}