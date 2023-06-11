import {
  ClientProxy,
  ClientProxyFactory,
  RmqContext,
  Transport,
} from '@nestjs/microservices';
import Queue from './queue.interface';
import { Logger } from '@nestjs/common';

export default class RabbitMQAdapter implements Queue {
  private clientAdminBackend: ClientProxy;
  private ackErrors: string[] = ['E11000'];
  private logger = new Logger('RabbitMQ');

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

  async finalizeMsg(
    callback: any,
    args: any,
    context: RmqContext,
  ): Promise<any> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      const response = await callback(...args);
      await channel.ack(originalMsg);
      return response;
    } catch (error: any) {
      this.logger.error(`error:  ${error.message}`);
      for (const ackError of this.ackErrors) {
        if (error?.message.includes(ackError)) {
          await channel.ack(originalMsg);
          break;
        }
      }
    }
  }
}
