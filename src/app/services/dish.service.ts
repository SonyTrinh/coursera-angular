import { Injectable } from "@angular/core";
import { Dish } from "../shared/dish";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
@Injectable({
  providedIn: "root"
})
export class DishService {
  constructor(
    private http: HttpClient, 
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  getDishes(): Observable<Dish[]> {
    return this.http
      .get<Dish[]>(baseURL + "/dishes")
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: string): Observable<Dish> {
    return this.http
      .get<Dish>(baseURL + "/dishes/" + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeatureDish(): Observable<Dish> {
    return this.http
      .get<Dish>(baseURL + "/dishes?featured=true")
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishByIds(): Observable<string[] | any> {
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }

  addDish(dish: Dish): Observable<Dish> {
    const httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this.http
      .put<Dish>(baseURL + "/dishes/" + dish.id, dish, httpOption)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
