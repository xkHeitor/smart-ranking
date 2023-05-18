import CreatePlayerDto from '../dtos/create-player.dto';
import Player from '../entities/player.interface';

export default abstract class PlayerRepository {
  abstract getAll(): Promise<Player[]>;
  abstract getFindByEmail(email: string): Promise<Player | undefined>;
  abstract getFindById(_id: string): Promise<Player | undefined>;
  abstract create(createPlayerDto: CreatePlayerDto): Promise<Player>;
  abstract update(
    id: string,
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player>;
  abstract delete(email: string): Promise<void>;
}
