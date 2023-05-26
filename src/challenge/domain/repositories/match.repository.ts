import Match from '../entities/match.interface';

export default abstract class MatchRepository {
  abstract create(createMatch: Match): Promise<void>;
  abstract deleteById(_id: string): Promise<void>;
}
