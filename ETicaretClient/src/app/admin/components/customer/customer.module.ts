import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { RouterModule } from '@angular/router';



import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: CustomerComponent }
    ]),
    MatIconModule
  ]
})
export class CustomerModule { }
