import { Component, OnInit } from "@angular/core";
import { DishService } from "../services/dish.service";
import { PromotionService } from "../services/promotion.service";
import { Promotion } from "../shared/promotion";
import { Dish } from "../shared/dish";
import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  constructor(
    private dishService: DishService,
    private promoService: PromotionService,
    private leaderService: LeaderService
  ) {}

  ngOnInit() {
    this.dishService.getFeatureDish().then(dishes => (this.dish = dishes));
    this.promoService
      .getFeaturedPromotion()
      .then(promo => (this.promotion = promo));
    this.leaderService
      .getFeatureLeader()
      .then(leaders => (this.leader = leaders));
  }
}
