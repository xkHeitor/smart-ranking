export default abstract class Queue {
  abstract connect(rabbitmqUrl: string, queue: string): void;
  abstract emitter(pattern: string, data: any): Promise<any>;
  abstract sender(pattern: string, data: any): Promise<any>;
}
