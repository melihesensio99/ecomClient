import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { RoleService } from '../../../../services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spiner: NgxSpinnerService,
    private roleService: RoleService,
    private alertify: AlertifyService) {
    super(spiner)
  }

  ngOnInit(): void {
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  @ViewChild("roleName") roleName: ElementRef;

  selectedRoleId: string;

  create(name: HTMLInputElement) {
    if (!name.value || name.value.trim() === "") {
      this.alertify.message("Lütfen bir rol adı giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }

    this.showSpinner(SpinnerType.BallAtom);


    this.roleService.create(name.value, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Role başarıyla eklenmiştir.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdRole.emit(name.value);
      name.value = "";
    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
    });
  }

  editRole(role: any) {
    this.selectedRoleId = role.id;
    this.roleName.nativeElement.value = role.name;
  }

  update(name: HTMLInputElement) {
    if (!name.value || name.value.trim() === "") {
      this.alertify.message("Lütfen bir rol adı giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.showSpinner(SpinnerType.BallAtom);
    this.roleService.update(this.selectedRoleId, name.value, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Role başarıyla güncellenmiştir.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.selectedRoleId = null;
      name.value = "";
      this.createdRole.emit(null);
    })
  }
}

