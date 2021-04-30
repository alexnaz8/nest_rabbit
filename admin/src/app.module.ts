import { Module } from '@nestjs/common';
// import { ProductModule } from './product/product.module';
import { RabbitExampleModule } from './product/product.module';

@Module({
  imports: [RabbitExampleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
