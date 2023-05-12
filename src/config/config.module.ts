import { Module } from '@nestjs/common';
import Environments from './environment';

@Module({
  exports: [Environments],
})
export class ConfigModule {}
