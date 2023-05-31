import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Queue from 'apps/common/src/queue/queue.interface';
import CreateCategoryDto from './domain/dtos/create-category.dto';

@Controller('api/v1')
export default class ApiGatewayController {
  private logger = new Logger(ApiGatewayController.name);

  constructor(
    private readonly queue: Queue,
    private readonly configService: ConfigService,
  ) {
    const rabbitmqUrl = this.configService.get<string>('rabbitmq.urlConnect');
    const rabbitmqVhost = this.configService.get<string>('rabbitmq.vhost');
    const queueName = this.configService.get<string>('api-gateway.queueName');
    this.queue.connect(`${rabbitmqUrl}/${rabbitmqVhost}`, queueName);
  }

  @Post('categories')
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<any> {
    await this.queue.emitter('create-category', createCategoryDto);
    this.logger.log(
      `create-category emitted to ${JSON.stringify(createCategoryDto)}`,
    );
  }
}
