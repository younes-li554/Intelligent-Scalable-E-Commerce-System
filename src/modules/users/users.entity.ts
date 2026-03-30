import { Entity, Column ,OneToMany  } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Order } from '../orders/orders.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @Column()
  tenant_id: string;
}