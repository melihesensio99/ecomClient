import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { List_Role } from 'src/app/contracts/role/List_Role';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(ListComponent) listComponents: ListComponent;
  @ViewChild(CreateComponent) createComponent: CreateComponent;

  createdRole(createdRole: string) {
    this.listComponents.getRoles();
  }

  editRole(role: List_Role) {
    this.createComponent.editRole(role);
  }
}
