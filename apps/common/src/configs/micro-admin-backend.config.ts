import { registerAs } from '@nestjs/config';

export default registerAs('micro-admin-backend', () => ({
  port: process.env.MICRO_ADMIN_BACKEND_PORT,
}));
