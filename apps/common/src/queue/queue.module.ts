import { Module } from '@nestjs/common';
import Queue from './queue.interface';
import RabbitMQAdapter from './rabbitmq.adapter';

@Module({
  providers: [
    {
      provide: Queue,
      useClass: RabbitMQAdapter,
    },
  ],
  exports: [Queue],
})
export class QueueModule {}
