import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';
import { List_User } from 'src/app/contracts/users/list_user';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends BaseComponent implements OnInit {

  users: List_User[] = [];

  constructor(spinner: NgxSpinnerService, private userService: UserService) {
    super(spinner);
  }

  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom);
    const usersData = await this.userService.getAllUsers(0, 50, () => {}, errorMessage => {});
    if (usersData) {
      this.users = usersData.users;
    }
    this.hideSpinner(SpinnerType.BallAtom);
  }

}
