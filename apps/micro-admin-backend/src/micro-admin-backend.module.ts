import { Configs } from '@configs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { config } from 'dotenv';

import { RepositoryModule } from './domain/repositories/repository.module';
import { MicroAdminBackendController } from './micro-admin-backend.controller';
import { MicroAdminBackendService } from './micro-admin-backend.service';

config();
const urlMongoConnect = `${process.env.DB_URL_MONGO}${process.env.DB_MONGO_NAME_MICRO_ADMIN}${process.env.DB_CONFIG_MONGO}`;
@Module({
  controllers: [MicroAdminBackendController],
  providers: [MicroAdminBackendService],
  imports: [
    ConfigModule.forRoot({
      load: Configs,
    }),
    RepositoryModule,
    MongooseModule.forRoot(urlMongoConnect),
  ],
})
export class MicroAdminBackendModule {}
