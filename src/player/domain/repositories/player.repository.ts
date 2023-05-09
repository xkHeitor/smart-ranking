import CreatePlayerDto from '../dtos/create-player.dto';

export default abstract class PlayerRepository {
  abstract create(createPlayerDto: CreatePlayerDto): Promise<void>;
}
