import { Component, OnInit } from '@angular/core';
import { CalculationService } from 'src/app/service/calculation/calculation.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-create-calculation',
  templateUrl: './create-calculation.component.html',
  styleUrls: ['./create-calculation.component.css'],
})
export class CreateCalculationComponent implements OnInit {
  calculation: any = {
    provider: '',
    items: [],
  };
  searchQuery: string = '';
  searchResults: any[] = [];
  selectedProduct: any = null;
  newProduct = {
    sif: 0,
    neto: 0,
    margin: 0,
    quantity: 0,
    pdv: 20,
  };

  constructor(
    private calculationService: CalculationService,
    private productService: ProductService
  ) {}

  searchProducts(): void {
    this.productService.searchProducts(this.searchQuery).subscribe((data) => {
      this.searchResults = data;
      this.selectedProduct = null;
    });
  }

  selectProduct(product: any): void {
    this.selectedProduct = product;
    this.newProduct.sif = this.selectedProduct.sif;
  }

  addProduct(): void {
    this.newProduct.neto = Number(this.newProduct.neto);
    this.newProduct.quantity = Number(this.newProduct.quantity);
    this.calculation.items.push(this.newProduct);
    this.newProduct = {
      sif: 0,
      neto: 0,
      margin: 0,
      quantity: 0,
      pdv: 0,
    };
  }

  onPdvChange(event: any) {
    if (this.newProduct.neto == 0) {
      return;
    }
    this.calculateMargin();
  }

  netoPriceKeyUp(event: KeyboardEvent) {
    // Access the value of the input field
    const inputValue = (event.target as HTMLInputElement).value;

    if (inputValue == '') {
      this.newProduct.margin = 0;
      return;
    }

    if (Number.isNaN(Number(inputValue))) {
      alert('Neto cena mora biti broj!');
      this.newProduct.neto = 0;
      return;
    }

    this.calculateMargin();
  }

  calculateMargin() {
    const pdvMultiplier = this.newProduct.pdv === 10 ? 1.1 : 1.2;

    const netoTimesPdv = this.newProduct.neto * pdvMultiplier;

    const margin =
      ((this.selectedProduct.cena - netoTimesPdv) / netoTimesPdv) * 100;

    this.newProduct.margin = Number(margin.toFixed(2));
  }

  createCalculation(): void {
    this.calculationService.createCalculation(this.calculation).subscribe(
      () => {
        alert('Successfully created a calculation');
      },
      (error) => {
        console.error('Could not create a calculation', error);
      }
    );
  }

  ngOnInit(): void {}
}
