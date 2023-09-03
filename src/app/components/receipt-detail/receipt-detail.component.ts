import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceiptService } from 'src/app/service/receipt/receipt.service';

@Component({
  selector: 'app-receipt-detail',
  templateUrl: './receipt-detail.component.html',
  styleUrls: ['./receipt-detail.component.css'],
})
export class ReceiptDetailComponent implements OnInit {
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
      .loadReceiptItems(this.receiptId, false)
      .subscribe((items) => {
        this.items = items;
        console.log(items);
      });
  }
}
