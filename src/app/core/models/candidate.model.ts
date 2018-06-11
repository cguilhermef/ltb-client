import { Vacancy } from '@core/models/vacancy.model';
import { Summoner } from './summoner.model';

export class Candidate {
  id: number;
  vacancy: Vacancy;
  summoner: Summoner;
}
