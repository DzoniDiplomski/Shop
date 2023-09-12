import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RequisitionService } from 'src/app/service/requisition/requisition.service';

@Component({
  selector: 'app-create-requisition',
  templateUrl: './create-requisition.component.html',
  styleUrls: ['./create-requisition.component.css'],
})
export class CreateRequisitionComponent implements OnInit {
  productName: string = '';
  productQuantity: number = 0;
  products: any[] = [];
  requisition: any = {
    managerId: this.authService.getUserId(),
  };

  addProduct() {
    if (this.productName && this.productQuantity > 0) {
      const product = {
        naz: this.productName,
        kolicina: this.productQuantity,
      };
      this.products.push(product);
      this.requisition.products = this.products;
      this.resetProductInput();
    }
  }

  resetProductInput() {
    this.productName = '';
    this.productQuantity = 0;
  }

  createRequisition() {
    this.requisition.products = this.products;
    this.requisitionService.createRequisition(this.requisition).subscribe(
      () => {
        alert('Success!');
        this.resetProductInput;
        this.products = [];
      },
      (error) => {
        console.error('Error creating requisition', error);
      }
    );
  }

  constructor(
    private requisitionService: RequisitionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}
