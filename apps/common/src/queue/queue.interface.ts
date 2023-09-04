export abstract class Queue {
  readonly ackErrors: string[];
  abstract connect(queueName: string): void;
  abstract emitter(pattern: string, data: any): Promise<any>;
  abstract sender(
    pattern: string,
    data: any,
    isPromise?: boolean,
  ): Promise<any>;
}
