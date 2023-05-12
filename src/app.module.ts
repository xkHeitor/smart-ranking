import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { MongooseModule } from '@nestjs/mongoose';
import Environments from './config/environment';

const Envs = new Environments();
console.log(Envs.getDbConnection());
@Module({
  imports: [
    MongooseModule.forRoot(Envs.getDbConnection(), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    PlayerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
