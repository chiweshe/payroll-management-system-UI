import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../../service/employee.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {DepartmentService} from "../../../service/department.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  validationForm: FormGroup;
  isFormSubmitted: Boolean;
  departmentId: number;
  departmentList: any;
  fullName: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  employeeCode: string;
  hireDate: string;
  jobTitle: string;
  employmentType: string
  salary: number;
  workLocation: string;
  status: string;


  constructor(public formBuilder: FormBuilder, private service: EmployeeService, private departmentService: DepartmentService,
              private router: Router) {

  }

  ngOnInit(): void {

    this.departmentService.viewList()
      .subscribe((data: any) => {
        this.departmentList = data.departmentDtoList
      })

    this.validationForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      birthDate : ['', Validators.required],
      email : ['', Validators.required],
      phone : ['', Validators.required],
      address : ['', Validators.required],
      employeeCode : ['', Validators.required],
      hireDate : ['', Validators.required],
      jobTitle : ['', Validators.required],
      employmentType : ['', Validators.required],
      workLocation : ['', Validators.required],
      departmentId : ['', Validators.required],
    });

    this.isFormSubmitted = false;
  }


  get form() {
    return this.validationForm.controls;
  }

  formSubmit() {
    if(this.validationForm.valid) {
      this.firstName = this.validationForm.controls.firstName.value;
      this.lastName = this.validationForm.controls.lastName.value;
      this.birthDate = this.validationForm.controls.birthDate.value;
      this.email = this.validationForm.controls.email.value;
      this.phone = this.validationForm.controls.phone.value;
      this.address = this.validationForm.controls.address.value;
      this.employeeCode = this.validationForm.controls.employeeCode.value;
      this.hireDate = this.validationForm.controls.hireDate.value;
      this.jobTitle = this.validationForm.controls.jobTitle.value;
      this.employmentType = this.validationForm.controls.employmentType.value;
      this.workLocation = this.validationForm.controls.workLocation.value;
      this.departmentId = this.validationForm.controls.departmentId.value;

      this.service.create(this.firstName, this.lastName, this.birthDate,this.email, this.phone, this.address, this.employeeCode, this.hireDate,
        this.jobTitle, this.employmentType, this.workLocation, this.departmentId)
        .subscribe(response => {
          if(response.statusCode == 201){

            Swal.fire({
              title: response.message,
              text: 'Successfully created!',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {
                this.router.navigate(['/employee/view']);
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
