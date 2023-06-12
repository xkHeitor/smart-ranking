import { Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import Queue from './queue.interface';

export default class RabbitMQAdapter implements Queue {
  ackErrors: string[];
  private clientAdminBackend: ClientProxy;
  private logger = new Logger('RabbitMQ');

  constructor() {
    this.ackErrors = ['E11000'];
  }

  connect(rabbitmqUrl: string, queue: string): void {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitmqUrl],
        queue: queue,
      },
    });
  }

  async emitter(pattern: string, data: any): Promise<any> {
    this.logger.log(`RabbitMQ - Emit for pattern: ${pattern}`);
    return this.clientAdminBackend.emit(pattern, data);
  }

  async sender(pattern: string, data: any): Promise<any> {
    this.logger.log(`RabbitMQ - Send for pattern: ${pattern}`);
    return this.clientAdminBackend.send(pattern, data);
  }
}
