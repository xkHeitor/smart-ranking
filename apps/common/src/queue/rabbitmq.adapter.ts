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

  constructor(private readonly configService: ConfigService) {
    this.ackErrors = ['E11000'];
  }

  connect(queueName): void {
    const rabbitmqUrl = this.configService.get<string>('rabbitmq.urlConnect');
    const rabbitmqVhost = this.configService.get<string>('rabbitmq.vhost');
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

  async sender(pattern: string, data: any, isPromise = false): Promise<any> {
    this.logger.log(`RabbitMQ - Send for pattern: ${pattern}`);
    if (!isPromise) return this.clientAdminBackend.send(pattern, data);
    return await this.clientAdminBackend.send(pattern, data).toPromise();
  }
}
