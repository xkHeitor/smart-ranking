import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import Queue from './queue.interface';

export default class RabbitMQAdapter implements Queue {
  private clientAdminBackend: ClientProxy;

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
    console.log(this.clientAdminBackend);
    return this.clientAdminBackend.emit(pattern, data);
  }
}
