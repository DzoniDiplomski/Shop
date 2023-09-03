import { Component, OnInit } from '@angular/core';
import { ReceiptService } from 'src/app/service/receipt/receipt.service';

@Component({
  selector: 'app-all-receipts',
  templateUrl: './all-receipts.component.html',
  styleUrls: ['./all-receipts.component.css'],
})
export class AllReceiptsComponent implements OnInit {
  totalPages = 1;
  currentPage = 1;
  leftoverItems = 0;
  itemsPerPage = 10;
  receipts: any[] = [];

  constructor(private receiptService: ReceiptService) {}

  ngOnInit(): void {
    this.receiptService
      .calculateTotalPages(false, `${this.itemsPerPage}`)
      .subscribe((data) => {
        this.totalPages = data.numberOfPages;
        if (data.leftoverItems > 0) {
          this.totalPages++;
          this.leftoverItems = data.leftoverItems;
        }
        this.receiptService
          .loadReceipts(false, `${this.currentPage}`, `${this.itemsPerPage}`)
          .subscribe((receipts) => {
            this.receipts = receipts;
          });
      });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.receiptService
        .loadReceipts(false, `${this.currentPage}`, `${this.itemsPerPage}`)
        .subscribe((receipts) => (this.receipts = receipts));
    }
  }
}
