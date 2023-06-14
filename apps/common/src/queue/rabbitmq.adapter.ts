import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Queue } from './queue.interface';

@Injectable()
export default class RabbitMQAdapter implements Queue {
  ackErrors: string[];
  private clientAdminBackend: ClientProxy;
  private logger = new Logger('RabbitMQ');

  constructor() {
    this.ackErrors = ['E11000'];
  }

  connect(configService: ConfigService): void {
    const rabbitmqUrl = configService.get<string>('rabbitmq.urlConnect');
    const rabbitmqVhost = configService.get<string>('rabbitmq.vhost');
    const queueName = configService.get<string>('api-gateway.queueName');
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`${rabbitmqUrl}/${rabbitmqVhost}`],
        queue: queueName,
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
