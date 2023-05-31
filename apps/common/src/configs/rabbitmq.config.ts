import { registerAs } from '@nestjs/config';

export default registerAs('rabbitmq', () => ({
  urlConnect: process.env.DB_CONNECT_RABBITMQ,
  vhost: process.env.DB_CONNECT_RABBITMQ_VHOST,
}));
