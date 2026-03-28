import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HubUrls } from '../../../constants/hub-urls';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { SignalRService } from '../../../services/common/signalr.service';
import { ProductService } from '../../../services/common/models/product.service';
import { OrderService } from '../../../services/common/models/order.service';
import { UserService } from '../../../services/common/models/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  totalProducts: number = 0;
  totalOrders: number = 0;
  totalUsers: number = 0;

  recentOrders: any[] = [];
  recentUsers: any[] = [];
  lowStockProducts: any[] = [];

  constructor(
    private alertify: AlertifyService,
    spinner: NgxSpinnerService,
    private signalRService: SignalRService,
    private productService: ProductService,
    private orderService: OrderService,
    private userService: UserService
  ) {
    super(spinner)
  }

  async ngOnInit(): Promise<void> {
    // Join Admins group for targeted notifications
    await this.signalRService.invoke(HubUrls.ProductHub, "AddToGroup", "Admins");
    await this.signalRService.invoke(HubUrls.OrderHub, "AddToGroup", "Admins");

    this.signalRService.on(HubUrls.ProductHub, ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        messageType: MessageType.Notify,
        position: Position.TopRight,
        dismissOthers: true
      });
      this.getDashboardStats();
    });
    this.signalRService.on(HubUrls.ProductHub, ReceiveFunctions.ProductLowStockMessageReceiveFunction, message => {
      this.alertify.message(message, {
        messageType: MessageType.Warning,
        position: Position.TopRight,
        dismissOthers: true
      });
      this.getDashboardStats();
    });
    this.signalRService.on(HubUrls.OrderHub, ReceiveFunctions.OrderAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        messageType: MessageType.Notify,
        position: Position.TopCenter,
        dismissOthers: true
      });
      this.getDashboardStats();
    });

    this.getDashboardStats();
  }

  async getDashboardStats() {
    this.showSpinner(SpinnerType.BallAtom);
    try {
      const productsData = await this.productService.read(0, 50, () => { }, errorMessage => { });
      this.totalProducts = productsData.totalProductCount;
      if (productsData.products) {
        this.lowStockProducts = productsData.products.filter((p: any) => p.stock <= 5);
      }
      
      const ordersData = await this.orderService.getAllOrders(0, 5, () => { }, errorMessage => { });
      this.totalOrders = ordersData.totalOrderCount;
      if (ordersData.orders) {
        this.recentOrders = ordersData.orders;
      }
      
      const usersData = await this.userService.getAllUsers(0, 5, () => { }, errorMessage => { });
      this.totalUsers = usersData.totalUsersCount;
      if (usersData.users) {
        this.recentUsers = usersData.users.slice(0, 2);
      }
    } catch (error) {
      console.error("Dashboard stats error", error);
    }
    this.hideSpinner(SpinnerType.BallAtom);
  }

  m() {
    this.alertify.message("Merhaba", {
      messageType: MessageType.Success,
      delay: 5,
      position: Position.TopRight
    })
  }

  d() {
    this.alertify.dismiss();
  }

}
