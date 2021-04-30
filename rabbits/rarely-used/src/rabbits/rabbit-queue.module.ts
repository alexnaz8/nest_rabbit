import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { RabbitQueueController } from './rabbit-queue.controller';
import { RabbitQueueService } from './rabbit-queue.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      // exchanges: [
      //   {
      //     name: 'fanoutTest',
      //     type: 'fanout',
      //   },
      // ],
      uri:
        'amqps://ohfuamqh:SxkCgqqikKSAFlC0QZN0NNDXcwqwPw76@cow.rmq2.cloudamqp.com/ohfuamqh',
    }),
    RabbitQueueModule,
  ],
  providers: [RabbitQueueService],
  controllers: [RabbitQueueController],
})
export class RabbitQueueModule {}
