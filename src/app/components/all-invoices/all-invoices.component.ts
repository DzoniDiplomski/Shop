import { Component, OnInit } from '@angular/core';
import { ReceiptService } from 'src/app/service/receipt/receipt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-invoices',
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.css'],
})
export class AllInvoicesComponent implements OnInit {
  totalPages = 1;
  currentPage = 1;
  leftoverItems = 0;
  itemsPerPage = 10;
  receipts: any[] = [];

  constructor(private receiptService: ReceiptService, private router: Router) {}

  ngOnInit(): void {
    this.receiptService
      .calculateTotalPages(true, `${this.itemsPerPage}`)
      .subscribe((data) => {
        this.totalPages = data.numberOfPages;
        if (data.leftoverItems > 0) {
          this.totalPages++;
          this.leftoverItems = data.leftoverItems;
        }
        this.receiptService
          .loadReceipts(true, `${this.currentPage}`, `${this.itemsPerPage}`)
          .subscribe((receipts) => {
            this.receipts = receipts;
            console.log(this.receipts);
          });
      });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.receiptService
        .loadReceipts(false, `${this.currentPage}`, `${this.itemsPerPage}`)
        .subscribe((receipts) => (this.receipts = receipts));
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

  viewReceipt(receiptId: number, createdAt: string) {
    this.router.navigate(['/receipt', receiptId, createdAt]);
  }
}
