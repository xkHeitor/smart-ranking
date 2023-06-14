import { ConfigService } from '@nestjs/config';

export abstract class Queue {
  readonly ackErrors: string[];
  abstract connect(configService: ConfigService): void;
  abstract emitter(pattern: string, data: any): Promise<any>;
  abstract sender(pattern: string, data: any): Promise<any>;
}
