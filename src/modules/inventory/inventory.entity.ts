import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from '../products/products.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('inventory')
export class Inventory extends BaseEntity {

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => Product)
  @OneToOne(() => Product, (product) => product.inventory)
  product: Product;
}