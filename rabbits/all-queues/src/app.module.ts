import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitQueueModule } from './rabbits/rabbit-queue.module';

@Module({
  imports: [RabbitQueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
