import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Department} from "../../../model/department";
import {Router} from "@angular/router";
import {DepartmentService} from "../../../service/department.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  validationForm: FormGroup;
  isFormSubmitted: Boolean;
  name: string;
  department: Department;

  constructor(public formBuilder: FormBuilder, private service: DepartmentService,
              private router: Router) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      name : ['', Validators.required],
      })

    this.isFormSubmitted = false;
  }

  get form() {
    return this.validationForm.controls;
  }

  formSubmit() {
    if(this.validationForm.valid) {

      this.name = this.validationForm.controls.name.value;

      this.service.create(this.name)
        .subscribe(response => {

          if(response.statusCode == 201){
            this.department = response.departmentDto;

            Swal.fire({
              title: response.message,
              text: 'Successfully created!',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {
                this.router.navigate(['/department/view']);
              }
            });

          }else{
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

