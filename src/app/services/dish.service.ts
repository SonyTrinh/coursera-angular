import { Injectable } from "@angular/core";
import { Dish } from "../shared/dish";
import { DISHES } from "../shared/dishes";

@Injectable({
  providedIn: "root"
})
export class DishService {
  constructor() {}

  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(DISHES);
      }, 2000);
    });
  }

  getDish(id: string): Promise<Dish> {
    return new Promise(resolve => {
      setTimeout(() => {
        DISHES.filter(dish => dish.id === id)[0];
      }, 2000);
    });
  }

  getFeatureDish(): Promise<Dish> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(DISHES.filter(x => x.featured)[0]);
      }, 2000);
    });
  }
}
