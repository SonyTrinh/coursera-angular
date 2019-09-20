import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Feedback, ContactType } from "../shared/feedback";
import { FeedbackService } from "../services/feedback.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackCopy: Feedback;

  errMsg: string;
  isLoading: boolean;
  isShowInformation: boolean;

  contactType = ContactType;
  @ViewChild("fform", { static: false }) feedbackFormDirective;

  formErrors = {
    firstName: "",
    lastName: "",
    telNum: "",
    email: ""
  };

  validationMessages = {
    firstName: {
      required: "First Name is required.",
      minlength: "First Name must be at least 2 characters long.",
      maxlength: "FirstName cannot be more than 25 characters long."
    },
    lastName: {
      required: "Last Name is required.",
      minlength: "Last Name must be at least 2 characters long.",
      maxlength: "Last Name cannot be more than 25 characters long."
    },
    telNum: {
      required: "Tel. number is required.",
      pattern: "Tel. number must contain only numbers."
    },
    email: {
      required: "Email is required.",
      email: "Email not in valid format."
    }
  };

  constructor(
    private fb: FormBuilder,
    private feedBackService: FeedbackService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstName: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(25)]
      ],
      lastName: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(25)]
      ],
      telNum: [0, [Validators.required, Validators.pattern]],
      email: ["", [Validators.required, Validators.email]],
      agree: false,
      contactType: "None",
      message: ""
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
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

  onSubmit() {
    this.isLoading = true;
    this.feedback = this.feedbackForm.value;
    this.feedBackService.addFeedback(this.feedback).subscribe(
      feedBack => {
        this.feedback = feedBack;
        this.feedbackCopy = feedBack;
        this.isLoading = false;
        this.isShowInformation = true;
      },
      errMsg => {
        this.feedback = null;
        this.feedbackCopy = null;
        this.errMsg = <any>errMsg;
      }
    );

    setTimeout(() => {
      this.isShowInformation = false;
    }, 5000);

    this.feedbackFormDirective.resetForm();
    this.feedbackForm.reset({
      firstName: "",
      lastName: "",
      telNum: 0,
      email: "",
      agree: false,
      contactType: "None",
      message: ""
    });
  }
}
