import { Module } from '@nestjs/common';
import { Queue } from './queue.interface';
import RabbitMQAdapter from './rabbitmq.adapter';
import { ConfigModule } from '@nestjs/config';
import { Configs } from '@configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      envFilePath: ['.env'],
    }),
  ],
  providers: [
    {
      provide: Queue,
      useClass: RabbitMQAdapter,
    },
  ],
  exports: [Queue],
})
export class QueueModule {}
