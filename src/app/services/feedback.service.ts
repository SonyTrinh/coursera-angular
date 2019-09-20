import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { Feedback } from "../shared/feedback";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";

@Injectable({
  providedIn: "root"
})
export class FeedbackService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  addFeedback(feedBack: Feedback): Observable<Feedback> {
    const httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this.http
      .post<Feedback>(baseURL + "/feedback/", feedBack, httpOption)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
