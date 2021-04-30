import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { RabbitGateway } from './rabbits.gateway';

@Injectable()
export class MessagingService {
  constructor(private socketGW: RabbitGateway) {}

  @RabbitRPC({
    exchange: 'amq.topic',
    routingKey: 'resp',
    queue: 'resp',
  })
  public async rpcHandler(msg: { response: string }) {
    const queueMessage = msg.response;
    console.log(`Received message: ${queueMessage}`);
    this.socketGW.sentQueueData(queueMessage);
  }
}
