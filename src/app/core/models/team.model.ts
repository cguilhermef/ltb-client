import { Member } from '@core/models/member.model';
import { Mode } from '@core/models/mode.model';
import { Vacancy } from '@core/models/vacancy.model';

export class Team {
  constructor(
    public id: number = null,
    public abbreviation: string = null,
    public name: string = null,
    public user_id: number = null,
    public tier_min: number = null,
    public modes: Mode[] = null,
    public members: Member[] = null,
    public vacancies: Vacancy[] = null
  ) {
  }
}
