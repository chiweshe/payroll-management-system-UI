import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaxService} from "../../../service/tax.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  validationForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder, private service: TaxService, private router: Router) {

  }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      lowerBound: ['', Validators.required],
      upperBound: ['', Validators.required],
      rate: ['', Validators.required],
      fixedAmount: ['', Validators.required]
    });
  }

  get form() {
    return this.validationForm.controls;
  }

  formSubmit(): void {
    this.isFormSubmitted = true;

    if (this.validationForm.valid) {
      const lowerBound = this.validationForm.controls.lowerBound.value;
      const upperBound = this.validationForm.controls.upperBound.value;
      const fixedAmount = this.validationForm.controls.fixedAmount.value;
      const rate = this.validationForm.controls.rate.value;

      this.service.create(lowerBound, upperBound, fixedAmount, rate)
        .subscribe(response => {
          if (response.statusCode === 201) {
            Swal.fire({
              title: 'Success',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/tax/view']);
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'Close'
            });
          }
        }, error => {
          Swal.fire({
            title: 'Error',
            text: 'Failed to create tax slab.',
            icon: 'error',
            confirmButtonText: 'Close'
          });
        });
    }
  }
}
