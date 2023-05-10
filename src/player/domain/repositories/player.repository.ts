import CreatePlayerDto from '../dtos/create-player.dto';
import Player from '../entities/player.interface';

export default abstract class PlayerRepository {
  abstract getAll(): Promise<Player[]>;
  abstract create(createPlayerDto: CreatePlayerDto): Promise<void>;
}
