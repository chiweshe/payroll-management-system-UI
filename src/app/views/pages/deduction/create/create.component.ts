import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Deduction} from "../../../model/deduction";
import {DeductionService} from "../../../service/deduction.service";

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
  deduction: Deduction;

  constructor(public formBuilder: FormBuilder, private service: DeductionService,
              private router: Router) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      name : ['', Validators.required],
      description : ['', Validators.required],
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

      this.service.create(this.name, this.description)
        .subscribe(response => {

          if (response.statusCode == 201) {
            this.deduction = response.deductionDto;

            Swal.fire({
              title: response.message,
              text: 'Successfully created!',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {
                this.router.navigate(['/deduction/view']);
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
