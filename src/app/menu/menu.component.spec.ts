import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MenuComponent } from "./menu.component";
import { DISHES } from "../shared/dishes";
import { of, Observable } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { baseURL } from "../shared/baseurl";
import { DishService } from "../services/dish.service";
import { Dish } from "../shared/dish";

describe("MenuComponent", () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  const dishServiceStub = {
    getDishes: function(): Observable<Dish[]> {
      return of(DISHES);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: "menu", component: MenuComponent }
        ]),
        BrowserAnimationsModule,
        FlexLayoutModule
      ],
      providers: [
        { provide: DishService, useValue: dishServiceStub },
        { provide: "baseURL", useValue: baseURL }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

//   it("dishes items should be 4", () => {
//     expect(component.dishes.length).toBe(4);
//     expect(component.dishes[1].name).toBe("Zucchipakoda");
//     expect(component.dishes[3].featured).toBeFalsy();
//   });
});
