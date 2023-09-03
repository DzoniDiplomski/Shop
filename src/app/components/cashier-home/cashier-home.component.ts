import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';
import { ReceiptService } from 'src/app/service/receipt/receipt.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth/auth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashier-home',
  templateUrl: './cashier-home.component.html',
  styleUrls: ['./cashier-home.component.css'],
  animations: [
    trigger('moveIcon', [
      state(
        'moved',
        style({
          transform: 'translateX(100px) translateY(-30px)',
          opacity: 0,
        })
      ),
      transition('* => moved', [
        animate(
          '1s',
          style({
            transform: 'translateX(-1100px) translateY(1000px)',
            opacity: 0,
          })
        ),
        animate(
          '0.5s',
          style({
            opacity: 1,
          })
        ),
      ]),
    ]),
  ],
})
export class CashierHomeComponent implements OnInit {
  searchedProducts: any[] = [];
  receiptItems: any[] = [];
  receiptTotal: number = 0;
  query: string = '';
  pib: number = 0;
  iconState = '';
  isAnimationInProgress = false;

  constructor(
    private productService: ProductService,
    private receiptService: ReceiptService,
    private authService: AuthService,
    private router: Router
  ) {}

  searchProducts(): void {
    const query = this.query;
    if (!query.trim()) {
      this.searchedProducts = [];
      return;
    }

    this.productService.searchProducts(query).subscribe((products) => {
      this.searchedProducts = products;
      console.log(products);
    });
  }

  resetIconState() {
    // Reset the animation and iconState
    this.isAnimationInProgress = false;
    setTimeout(() => {
      this.iconState = ''; // Reset icon state after a short delay
    }, 1000); // Adjust the delay time if needed
  }

  addProductToReceipt(product: any): void {
    const existingItem = this.receiptItems.find(
      (item) => item.sif === product.sif
    );

    if (existingItem) {
      existingItem.kolicina++;
    } else {
      this.receiptItems.push({ ...product, kolicina: 1 });
    }

    this.updateReceiptTotal();
  }

  updateReceiptTotal(): void {
    this.receiptTotal = this.receiptItems.reduce(
      (total, item) => total + item.cena * item.kolicina,
      0
    );
    console.log(this.receiptItems);
  }

  removeItemFromReceipt(index: number): void {
    this.receiptItems.splice(index, 1);
    this.updateReceiptTotal();
  }

  createReceipt(): void {
    if (this.receiptTotal === 0) {
      return;
    }

    const receiptDTO: any = {
      kasaId: 1,
      trafikaId: 1,
      jmbgKasira: this.authService.getUserId(),
      products: this.receiptItems.map((item) => ({
        sif: item.sif,
        bc: item.bc,
        naz: item.naz,
        cena: item.cena,
        kolicina: item.kolicina,
      })),
      pib: this.pib,
    };

    this.receiptService.createReceipt(receiptDTO).subscribe(
      () => {
        console.log('Receipt created successfully');
        this.clearPageItems();
      },
      (error) => {
        console.error('Error creating receipt:', error);
      }
    );
    this.iconState = 'moved';
    this.isAnimationInProgress = true; // Set animation in progress
  }

  clearPageItems(): void {
    this.receiptItems = [];
    this.receiptTotal = 0;
    this.searchedProducts = [];
    this.query = '';
    this.pib = 0;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {}
}
