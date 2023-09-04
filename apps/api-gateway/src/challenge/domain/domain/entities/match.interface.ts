import Player from 'apps/initial/src/player/domain/entities/player.interface';
import Result from './result.interface';

export default interface Match {
  category?: string;
  challenge?: string;
  players: Player[];
  winner?: Player;
  result: Result[];
}
