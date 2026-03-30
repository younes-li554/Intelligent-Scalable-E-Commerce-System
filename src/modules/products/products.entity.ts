import { Entity, Column, OneToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Inventory } from '../inventory/inventory.entity';
import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('products')
export class Product extends BaseEntity {

  @Field() // GraphQL field
  @Index()
  @Column()
  name: string;

  @Field(() => Float)
  @Column('decimal')
  price: number;

  @Field()
  @Column()
  description: string;

  @Field(() => Inventory, { nullable: true })
  @OneToOne(() => Inventory, (inventory) => inventory.product, {
    cascade: true,
  })
  @JoinColumn()
  inventory: Inventory;
}