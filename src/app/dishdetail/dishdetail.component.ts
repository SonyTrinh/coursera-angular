import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { Dish } from "../shared/dish";
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DishService } from "../services/dish.service";
import { switchMap } from "rxjs/operators";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Comment } from "../shared/comment";
import { visibility, expand } from "../animations/app.animation";

@Component({
  selector: "app-dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.scss"],

  animations: [visibility()]
})
export class DishdetailComponent implements OnInit {
  commentForm: FormGroup;
  comment: Comment;
  @ViewChild("cform", { static: false }) commentFormDirective;

  dish: Dish;
  dishcopy: Dish;
  visibility = "shown";

  dishIds: string[];
  next: string;
  prev: string;
  errMsg: string;

  rating = 1;
  tickInterval = 1;
  autoTicks = true;
  invert = true;
  max = 4;
  min = 1;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = 1;

  formErrors = {
    author: "",
    comment: ""
  };

  validationMessages = {
    author: {
      required: "First Name is required.",
      minlength: "First Name must be at least 2 characters long.",
      maxlength: "FirstName cannot be more than 25 characters long."
    },
    comment: {
      required: "Last Name is required.",
      minlength: "Last Name must be at least 2 characters long.",
      maxlength: "Last Name cannot be more than 25 characters long."
    }
  };

  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject("BaseURL") private BaseURL
  ) {
    this.createForm();
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      author: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(25)]
      ],
      comment: ["", [Validators.required]],
      rating: 5
    });

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + " ";
            }
          }
        }
      }
    }
  }

  ngOnInit() {
    this.dishService
      .getDishByIds()
      .subscribe(
        dishIds => (this.dishIds = dishIds),
        errMsg => (this.errMsg = <any>errMsg)
      );
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.visibility = "hidden";
          return this.dishService.getDish(params["id"]);
        })
      )
      .subscribe(
        dish => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = "shown";
        },
        errMsg => (this.errMsg = <any>errMsg)
      );
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];

    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    const isodate = new Date().toISOString();
    const comment: Comment = this.commentForm.value;

    this.comment = this.commentForm.value;
    comment.date = isodate;
    this.dishcopy.comments.push(comment);
    this.dishService.addDish(this.dishcopy).subscribe(
      dish => {
        this.dish = dish;
        this.dishcopy = dish;
      },
      errMsg => {
        this.dish = null;
        this.dishcopy = null;
        this.errMsg = <any>errMsg;
      }
    );
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      name: "",
      rating: 5,
      comment: ""
    });
  }
}
