import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Order } from 'src/app/contracts/order/list_order';
import { AuthService } from 'src/app/services/common/auth.service';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent extends BaseComponent implements OnInit {

  orders: List_Order[] = [];

  constructor(spinner: NgxSpinnerService, private orderService: OrderService, private authService: AuthService) {
    super(spinner);
  }

  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom);
    const orderData = await this.orderService.getAllOrders(0, 100, () => {}, errorMessage => {});
    const currentUser = this.authService.currentUserName;
    if (orderData && orderData.orders) {
      if (this.authService.isAdmin) {
        this.orders = orderData.orders;
      } else {
        this.orders = orderData.orders.filter(o => o.userName === currentUser);
      }
    }
    this.hideSpinner(SpinnerType.BallAtom);
  }

}
