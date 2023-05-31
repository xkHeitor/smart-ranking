import { registerAs } from '@nestjs/config';

export default registerAs('api-gateway', () => ({
  port: process.env.API_GATEWAY_PORT,
  queueName: process.env.QUEUE_NAME,
  nodeEnv: process.env.NODE_ENV,
}));
