import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '@core/endpoints';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    protected http: HttpClient
  ) { }

  destroy(memberId: number): Observable<any> {
    return this.http.delete(endpoints.members.byId(memberId));
  }
}
