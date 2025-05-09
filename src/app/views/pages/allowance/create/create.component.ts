import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Allowance} from "../../../model/allowance";
import {AllowanceService} from "../../../service/allowance.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  validationForm: FormGroup;
  isFormSubmitted: Boolean;
  name: string;
  description: string;
  taxable: boolean;
  allowance: Allowance;

  constructor(public formBuilder: FormBuilder, private service: AllowanceService,
              private router: Router) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      name : ['', Validators.required],
      description : ['', Validators.required],
      taxable : [],
    })

    this.isFormSubmitted = false;
  }

  get form() {
    return this.validationForm.controls;
  }

  formSubmit() {
    if(this.validationForm.valid) {

      this.name = this.validationForm.controls.name.value;
      this.description = this.validationForm.controls.description.value;
      this.taxable = this.validationForm.controls.taxable.value;

      this.service.create(this.name, this.description, this.taxable)
        .subscribe(response => {

          if (response.statusCode == 201) {
            this.allowance = response.allowanceDto;

            Swal.fire({
              title: response.message,
              text: 'Successfully created!',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {
                this.router.navigate(['/allowance/view']);
              }
            });

          } else {
            Swal.fire({
              title: 'Error!',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'Close'
            });
          }
        });

    }

    this.isFormSubmitted = true;

  }

}
