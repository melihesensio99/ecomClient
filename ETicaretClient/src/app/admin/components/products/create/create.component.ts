import { ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FileUploadComponent, FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { Create_Product } from '../../../../contracts/create_product';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { ProductService } from '../../../../services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spiner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) {
    super(spiner)
  }

  ngOnInit(): void {
  }

  @ViewChild(FileUploadComponent) fileUploadComponent: FileUploadComponent;

  public fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    explanation: "Resimleri seçin veya buraya sürükleyin...",
    isAdminPage: true,
    accept: ".png, .jpg, .jpeg"
  };

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  @ViewChild("txtName") txtName: ElementRef;
  @ViewChild("txtStock") txtStock: ElementRef;
  @ViewChild("txtPrice") txtPrice: ElementRef;

  selectedProductId: string;

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ürün başarıyla eklenmiştir.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdProduct.emit(create_product);
      name.value = "";
      stock.value = "0";
      price.value = "0";
    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
    });
  }

  editProduct(product: any) {
    this.selectedProductId = product.id;
    this.txtName.nativeElement.value = product.name;
    this.txtStock.nativeElement.value = product.stock;
    this.txtPrice.nativeElement.value = product.price;
  }

  update(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    this.productService.update({
      id: this.selectedProductId,
      name: name.value,
      stock: parseInt(stock.value),
      price: parseFloat(price.value)
    }, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ürün başarıyla güncellenmiştir.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdProduct.emit(null); // refresh list
      this.selectedProductId = null;
      name.value = "";
      stock.value = "0";
      price.value = "0";
    });
  }
}
