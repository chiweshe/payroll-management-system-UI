import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { UpdateComponent } from './update/update.component';
import { ViewSingleComponent } from './view-single/view-single.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {LayoutModule} from "../../layout/layout.module";
import { AddEmployeeAllowanceComponent } from './add-employee-allowance/add-employee-allowance.component';
import { AddEmployeeDeductionComponent } from './add-employee-deduction/add-employee-deduction.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'view',
        component: ViewComponent,
      },
      {
        path: 'update',
        component: UpdateComponent,
      },
      {
        path: 'add-allowance/:employeeId',
        component: AddEmployeeAllowanceComponent,
      },

      {
        path: 'add-deduction/:employeeId',
        component: AddEmployeeDeductionComponent,
      },

      {
        path: 'view/:id',
        component: ViewSingleComponent,
      },
      {
        path: 'delete',
        component: ViewComponent,
      },
    ]
  }
]

@NgModule({
  declarations: [
    CreateComponent,
    ViewComponent,
    ViewSingleComponent,
    UpdateComponent,
    AddEmployeeAllowanceComponent,
    AddEmployeeDeductionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxDatatableModule,
    LayoutModule
  ]
})
export class EmployeeModule { }
