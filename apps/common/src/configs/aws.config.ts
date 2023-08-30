import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  endpoint_s3: process.env.AWS_S3_ENDPOINT,
  bucket: process.env.AWS_BUCKET,
  region: process.env.AWS_REGION,
  access_key: process.env.AWS_ACCESS_KEY_ID,
  secret_key: process.env.AWS_SECRET_ACCESS_KEY,
}));
