import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceiptService } from 'src/app/service/receipt/receipt.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent implements OnInit {
  receiptId = '';
  createdAt = '';
  items: any;

  constructor(
    private route: ActivatedRoute,
    private receiptService: ReceiptService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.receiptId = params['id'];
      this.createdAt = params['createdAt'];
      this.loadItems();
    });
  }

  loadItems() {
    this.receiptService
      .loadReceiptItems(this.receiptId, true)
      .subscribe((items) => {
        this.items = items;
      });
  }
}
