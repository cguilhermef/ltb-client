import { Candidate } from '@core/models/candidate.model';

export class Vacancy {
  id: number;
  role_id: number;
  candidates?: Candidate[];
}
