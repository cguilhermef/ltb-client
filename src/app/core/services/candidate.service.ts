import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '@core/endpoints';
import { Member } from '@core/models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(
    protected http: HttpClient
  ) { }

  accept(candidateId: number, teamId: number): Observable<Member> {
    return this.http
      .post(`${ environment.api }/teams/${ teamId }/members`, { candidateId })
      .pipe(
        map(r => r as Member)
      );
  }

  reject(candidateId: number): Observable<any> {
    return this.http
      .delete(`${ endpoints.candidates.byId(candidateId) }`)
      .pipe(
        map(r => r)
      );
  }
}
