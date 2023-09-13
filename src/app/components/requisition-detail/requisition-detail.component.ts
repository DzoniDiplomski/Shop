import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequisitionService } from 'src/app/service/requisition/requisition.service';

@Component({
  selector: 'app-requisition-detail',
  templateUrl: './requisition-detail.component.html',
  styleUrls: ['./requisition-detail.component.css'],
})
export class RequisitionDetailComponent implements OnInit {
  requisitionId = '';
  createdAt = '';
  items: any;

  constructor(
    private route: ActivatedRoute,
    private requisitionService: RequisitionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.requisitionId = params['id'];
      this.createdAt = params['createdAt'];
      this.loadItems();
    });
  }

  loadItems() {
    this.requisitionService
      .loadRequisitionItems(this.requisitionId)
      .subscribe((items) => {
        console.log(items);
        this.items = items;
      });
  }
}
