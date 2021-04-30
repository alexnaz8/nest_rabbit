import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('products')
export class MessagingController {
  private messages: number;
  constructor(private readonly amqpConnection: AmqpConnection) {
    this.messages = 0;
  }

  // public publish(
  //   exchange: string,
  //   routingKey: string,
  //   message: any,
  //   options?: amqplib.Options.Publish
  // )

  @Post('many')
  sendMany(
    @Body() createProducts: { CreateProductDto; amount: number; queue: string },
  ) {
    const { amount, queue, ...createProductDto } = createProducts;
    const exchange = queue === 'send_all' ? 'fanoutTest' : 'amq.direct';
    console.log({ createProducts, exchange });
    for (let i = 0; i < amount; i++) {
      this.amqpConnection.publish(
        exchange,
        queue,
        {
          msg: JSON.stringify({
            count: ++this.messages,
            ...createProductDto,
          }),
        },
        { replyTo: 'resp' },
      );
    }
  }
}
