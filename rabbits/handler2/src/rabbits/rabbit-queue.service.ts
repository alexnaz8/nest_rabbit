import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';

@Injectable()
export class RabbitQueueService {
  constructor() {}

  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: 'main_queue',
    queue: 'main_queue',
  })
  public async pubSubHandler(message: { msg }, amqpMsg: ConsumeMessage) {
    const { msg } = message;
    console.log({ msg });
    console.log({ amqpMsg });
    return { response: `Handler2 is done. Received data: ${msg}` };
  }
}
