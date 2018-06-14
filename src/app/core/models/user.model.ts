import { Summoner } from '@core/models/summoner.model';

export class User {
  id: number;
  email: string;
  nickname: string;
  password: string;
  region_id: number;
  summoner: Summoner;
}
