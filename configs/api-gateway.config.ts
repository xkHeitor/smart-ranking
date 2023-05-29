import { registerAs } from '@nestjs/config';

export default registerAs('api-gateway', () => ({
  port: process.env.API_GATEWAY_PORT,
  nodeEnv: process.env.NODE_ENV,
}));
