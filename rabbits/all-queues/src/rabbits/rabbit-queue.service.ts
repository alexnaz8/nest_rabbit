import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';

@Injectable()
export class RabbitQueueService {
  @RabbitRPC({
    exchange: 'amq.fanout',
    routingKey: 'spy_queue',
    queue: 'spy_queue',
  })
  public async rpcHandler(msg: { response: string }) {
    const queueMessage = msg.response;
    console.log(`Received message: ${queueMessage}`);
  }
  // public async pubSubHandler(message: { msg }, amqpMsg: ConsumeMessage) {
  //   const { msg } = message;
  //   console.log({ msg });
  //   console.log({ amqpMsg });
  //   return { response: `Spy service is done. Received data: ${msg}` };
  // }
}
