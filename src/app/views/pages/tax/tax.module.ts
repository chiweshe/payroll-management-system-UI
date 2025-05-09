import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxComponent } from './tax.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { ViewSingleComponent } from './view-single/view-single.component';
import { UpdateComponent } from './update/update.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {LayoutModule} from "../../layout/layout.module";


const routes: Routes = [
  {
    path: '',
    component: TaxComponent ,
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
    UpdateComponent
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
export class TaxModule { }
