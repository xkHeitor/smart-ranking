import { Configs } from '@configs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { config } from 'dotenv';

import { QueueModule } from '@queue';
import { RepositoryModule } from '../infra/database/mongoose/repositories/repository.module';
import { MicroAdminBackendController } from './category.controller';
import { CategoryService } from './category.service';

config();
const urlMongoConnect = `${process.env.DB_URL_MONGO}${process.env.DB_MONGO_NAME_MICRO_ADMIN}${process.env.DB_CONFIG_MONGO}`;
@Module({
  controllers: [MicroAdminBackendController],
  providers: [CategoryService],
  imports: [
    ConfigModule.forRoot({
      load: Configs,
    }),
    RepositoryModule,
    QueueModule,
    MongooseModule.forRoot(urlMongoConnect),
  ],
})
export class CategoryModule {}
