// import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ProductController } from './product.controller';
// import { ProductService } from './product.service';

// import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
// // import { Module } from '@nestjs/common';

// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: 'PRODUCT_SERVICE',
//         transport: Transport.RMQ,
//         options: {
//           urls: [
//             'amqps://ohfuamqh:SxkCgqqikKSAFlC0QZN0NNDXcwqwPw76@cow.rmq2.cloudamqp.com/ohfuamqh',
//           ],
//           queue: 'main_queue',
//           noAck: false,
//           queueOptions: {
//             durable: false,
//           },
//         },
//       },
//     ]),
//   ],
//   controllers: [ProductController],
//   providers: [ProductService],
// })
// export class ProductModule {}

// // @Module({
// //   controllers: [ProductController],
// //   providers: [ProductService],
// // })
// // export class ProductModule {}

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MessagingController } from './messaging.controller';
import { MessagingService } from './messaging.service';
import { RabbitGateway } from './rabbits.gateway';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      // exchanges: [
      //   {
      //     name: 'exchange1',
      //     type: 'topic',
      //   },
      // ],
      uri:
        'amqps://ohfuamqh:SxkCgqqikKSAFlC0QZN0NNDXcwqwPw76@cow.rmq2.cloudamqp.com/ohfuamqh',
    }),
    RabbitExampleModule,
  ],
  providers: [MessagingService, RabbitGateway],
  controllers: [MessagingController],
})
export class RabbitExampleModule {}
