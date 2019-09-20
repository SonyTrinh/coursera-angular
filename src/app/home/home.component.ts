import { Component, OnInit, Inject } from "@angular/core";
import { DishService } from "../services/dish.service";
import { PromotionService } from "../services/promotion.service";
import { Promotion } from "../shared/promotion";
import { Dish } from "../shared/dish";
import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";
import { flyInOut, expand } from "../animations/app.animation";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  host: {
    "[@flyInOut]": "true",
    style: "display: block;"
  },
  animations: [flyInOut(), expand()]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  errorMsg: string;

  constructor(
    private dishService: DishService,
    private promoService: PromotionService,
    private leaderService: LeaderService,
    @Inject("BaseURL") private BaseURL
  ) {}

  ngOnInit() {
    this.dishService
      .getFeatureDish()
      .subscribe(
        dishes => (this.dish = dishes),
        errorMsg => (this.errorMsg = <any>errorMsg)
      );
    this.promoService
      .getFeaturedPromotion()
      .subscribe(
        promo => (this.promotion = promo),
        errorMsg => (this.errorMsg = <any>errorMsg)
      );
    this.leaderService
      .getFeatureLeader()
      .subscribe(
        leaders => (this.leader = leaders),
        errorMsg => (this.errorMsg = <any>errorMsg)
      );
  }
}
