import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryComponent } from './salary.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {LayoutModule} from "../../layout/layout.module";
import {CreateComponent} from "./create/create.component";
import {ViewComponent} from "./view/view.component";




const routes: Routes = [
  {
    path: '',
    component: SalaryComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'view',
        component: ViewComponent,
      },
    ]
  }
]

@NgModule({
  declarations: [
    CreateComponent,
    ViewComponent
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
export class SalaryModule { }
