import { Component, OnInit, Inject } from "@angular/core";
import { LeaderService } from "../services/leader.service";
import { Leader } from "../shared/leader";
import { expand, flyInOut } from "../animations/app.animation";
@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
  host: {
    "[@flyInOut]": "true",
    style: "display: block;"
  },
  animations: [flyInOut(), expand()]
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  errorMsg: string;

  constructor(
    private leaderService: LeaderService,
    @Inject("BaseURL") public BaseURL
  ) {}

  ngOnInit() {
    this.leaderService.getLeaders().subscribe(leader => {
      (this.leaders = leader), errorMsg => (this.errorMsg = <any>errorMsg);
    });
  }
}
