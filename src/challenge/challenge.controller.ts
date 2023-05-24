import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import Challenge from './domain/entities/challenge.interface';
import CreateChallengeDto from './domain/dtos/create-challenge.dto';
import { StatusChallengeValidationPipe } from './infra/pipes/status-challenge-validation.pipe';
import UpdateChallengeDto from './domain/dtos/update-challenge.dto';
import AssignMatchChallengeDto from './domain/dtos/assign-match-challenge.dto';

@Controller('api/v1/challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  private readonly logger = new Logger(ChallengeController.name);

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(
    @Body() createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    this.logger.log(
      `createChallengeDto: ${JSON.stringify(createChallengeDto)}`,
    );
    return await this.challengeService.createChallenge(createChallengeDto);
  }

  @Get()
  async getChallenges(@Query('playerId') id: string): Promise<Challenge[]> {
    return id
      ? await this.challengeService.getOneChallenge(id)
      : await this.challengeService.getAllChallenges();
  }

  @Put('/:challenge')
  async atualizarDesafio(
    @Body(StatusChallengeValidationPipe)
    atualizarDesafioDto: UpdateChallengeDto,
    @Param('challenge') id: string,
  ): Promise<void> {
    await this.challengeService.updateChallenge(id, atualizarDesafioDto);
  }

  @Post('/:challenge/match/')
  async atribuirDesafioPartida(
    @Body(ValidationPipe) atribuirDesafioPartidaDto: AssignMatchChallengeDto,
    @Param('challenge') id: string,
  ): Promise<void> {
    return await this.challengeService.assignMatchChallenge(
      id,
      atribuirDesafioPartidaDto,
    );
  }

  @Delete('/:id')
  async deleteChallenge(@Param('id') id: string): Promise<void> {
    await this.challengeService.deleteChallenge(id);
  }
}
