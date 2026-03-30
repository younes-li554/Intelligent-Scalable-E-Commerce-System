import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { RedisModule } from './config/redis.module';
import { typeOrmConfig } from './config/database.config';

import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { QueueModule } from './modules/queue/queue.module';
import { GraphQLAppModule } from './modules/graphql/graphql.module';
import { AIServiceModule } from './modules/ai/ai.module';
import { ETLModule } from './modules/etl/etl.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),

    UsersModule,
    AuthModule,
    ProductsModule,
    InventoryModule,
    RedisModule,

    OrdersModule,       
    PaymentsModule,    
    QueueModule,        
    GraphQLAppModule,     
    AIServiceModule,    
    ETLModule,          
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}