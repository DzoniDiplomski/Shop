import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-price-stats',
  templateUrl: './price-stats.component.html',
  styleUrls: ['./price-stats.component.css'],
})
export class PriceStatsComponent implements OnInit {
  public single: any[] = [];
  public multi: any[] = [];
  searchQuery: string = '';
  searchResults: any[] = [];
  selectedProduct: any = null;
  priceStats: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  searchProducts() {
    this.productService.searchProducts(this.searchQuery).subscribe(
      (data) => (this.searchResults = data),
      (error) => console.error('Error searching products', error)
    );
  }

  selectProduct(product: any): void {
    this.selectedProduct = product;
    this.productService.retreivePriceStats(product.sif).subscribe(
      (data) => {
        this.priceStats = data;
      },
      (error) => console.error('Error retrieving price stats', error)
    );
  }
}
