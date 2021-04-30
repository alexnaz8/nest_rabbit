import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';

@Injectable()
export class RabbitQueueService {
  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: 'rare_queue',
    queue: 'rare_queue',
  })
  public async pubSubHandler(message: { msg }, amqpMsg: ConsumeMessage) {
    const { msg } = message;
    console.log({ msg });
    console.log({ amqpMsg });
    return { response: `Rarely used service is done. Received data: ${msg}` };
  }
}
