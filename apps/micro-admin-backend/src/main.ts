import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { AppModule } from './app.module';

(async function bootstrap() {
  config();
  const rabbitmqURL = `${process.env.DB_CONNECT_RABBITMQ}/${process.env.DB_CONNECT_RABBITMQ_VHOST}`;
  const queueName = process.env.QUEUE_NAME;
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqURL],
      noAck: false,
      queue: queueName,
    },
  });
  await app.listen();
})();
