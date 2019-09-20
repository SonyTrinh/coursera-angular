import { Injectable } from "@angular/core";
import { Leader } from "../shared/leader";
import { LEADERS } from "../shared/leaders";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
@Injectable({
  providedIn: "root"
})
export class LeaderService {
  constructor(
    private http: HttpClient,
    private msgServer: ProcessHTTPMsgService
  ) {}

  getLeaders(): Observable<Leader[]> {
    return this.http
      .get<Leader[]>(baseURL + "/leadership")
      .pipe(catchError(this.msgServer.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http
      .get<Leader>(baseURL + "/leadership/" + id)
      .pipe(catchError(this.msgServer.handleError));
  }

  getFeatureLeader(): Observable<Leader> {
    return this.http
      .get<Leader>(baseURL + "/leadership?feature=true")
      .pipe(map(leader => leader[0]))
      .pipe(catchError(this.msgServer.handleError));
  }
}
