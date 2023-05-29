import Match from '../entities/match.interface';

export default abstract class MatchRepository {
  abstract create(createMatch: Match): Promise<Match>;
  abstract deleteById(_id: string): Promise<void>;
}
