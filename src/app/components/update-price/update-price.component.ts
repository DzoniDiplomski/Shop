import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-update-price',
  templateUrl: './update-price.component.html',
  styleUrls: ['./update-price.component.css'],
})
export class UpdatePriceComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];
  selectedProduct: any = null;
  updatedPrice: number = 0;
  updatedStartDate: string = '';
  updatedEndDate: string = '';

  constructor(private productService: ProductService, private toastr: ToastrService) {}

  searchProducts(): void {
    this.productService.searchProducts(this.searchQuery).subscribe((data) => {
      this.searchResults = data;
      this.selectedProduct = null;
    });
  }

  selectProduct(product: any): void {
    this.selectedProduct = product;
    this.updatedPrice = product.cena;
  }

  updatePrice(): void {
    if (this.selectedProduct) {
      const updatedProduct = {
        sif: this.selectedProduct.sif,
        cena: this.updatedPrice,
        pocetak_vazenja: this.updatedStartDate,
        kraj_vazenja: this.updatedEndDate,
      };

      this.productService.updateProductPrice(updatedProduct).subscribe(
        () => {
          this.toastr.success('Price updated successfully', 'Success')
        },
        (error) => {
          console.error('Error updating price', error);
        }
      );
    }
  }

  ngOnInit(): void {}
}
