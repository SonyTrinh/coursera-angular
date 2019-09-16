import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Feedback, ContactType } from "../shared/feedback";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  @ViewChild("fform", { static: false }) feedbackFormDirective;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {}

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      telNum: ["", Validators.required],
      email: ["", Validators.required],
      agree: false,
      contactType: "None",
      message: ""
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.feedbackForm.reset({
      firstName: "",
      lastName: "",
      telNum: 0,
      email: "",
      agree: false,
      contactType: "None",
      message: ""
    });

    this.feedbackFormDirective.resetForm();
  }
}
