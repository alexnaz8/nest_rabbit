import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RabbitQueueService } from './rabbit-queue.service';

@Controller('products')
export class RabbitQueueController {
  constructor(private readonly queueService: RabbitQueueService) {}
}
