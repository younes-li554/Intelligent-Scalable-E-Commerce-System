import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), 
      sortSchema: true,
      playground: true,
    }),
    ProductsModule,
  ],
})
export class GraphQLAppModule {}