export default abstract class Queue {
  readonly ackErrors: string[];
  abstract connect(rabbitmqUrl: string, queue: string): void;
  abstract emitter(pattern: string, data: any): Promise<any>;
  abstract sender(pattern: string, data: any): Promise<any>;
}
