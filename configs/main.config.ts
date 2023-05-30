import { registerAs } from '@nestjs/config';

export default registerAs('main', () => ({
  port: process.env.MAIN_PORT,
  nodeEnv: process.env.NODE_ENV,
}));
