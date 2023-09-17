import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';
Chart.register(...registerables);

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

  ngOnInit(): void {
  }

  buildChart(chartData: any) {
    var labelsData = []
    var priceData = []
    for(let i = chartData.length - 1; i >= 0; i--) {
      labelsData.push(chartData[i].startDate)
      priceData.push(chartData[i].price)
    }

    var myChart = new Chart("myChart", {
      type: 'line',
      data: {
          labels: labelsData,
          datasets: [{
              label: 'Cena proizvoda',
              data: priceData,
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              },
              x: {
                time: {
                  displayFormats: {
                    'millisecond': 'MMM DD',
                    'second': 'MMM DD',
                    'minute': 'MMM DD',
                    'hour': 'MMM DD',
                    'day': 'MMM DD',
                    'week': 'MMM DD',
                    'month': 'MMM DD',
                    'quarter': 'MMM DD',
                    'year': 'MMM DD',
                  }
                }
              }
          }
      }
  });
  }

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
        this.buildChart(data);
      },
      (error) => console.error('Error retrieving price stats', error)
    );
  }
}
