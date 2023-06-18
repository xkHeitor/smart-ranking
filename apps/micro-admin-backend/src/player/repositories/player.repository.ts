import CreatePlayerDto from '../dtos/create-player.dto';
import UpdatePlayerDto from '../dtos/update-player.dto';
import Player from '../interfaces/player.interface';

export default abstract class PlayerRepository {
  abstract getAll(): Promise<Player[]>;
  abstract getFindById(_id: string): Promise<Player | undefined>;
  abstract create(createPlayerDto: CreatePlayerDto): Promise<Player>;
  abstract update(id: string, createPlayerDto: UpdatePlayerDto): Promise<void>;
  abstract delete(email: string): Promise<void>;
}
