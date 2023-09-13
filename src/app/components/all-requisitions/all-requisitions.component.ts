import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequisitionService } from 'src/app/service/requisition/requisition.service';

@Component({
  selector: 'app-all-requisitions',
  templateUrl: './all-requisitions.component.html',
  styleUrls: ['./all-requisitions.component.css'],
})
export class AllRequisitionsComponent implements OnInit {
  totalPages = 1;
  currentPage = 1;
  leftoverItems = 0;
  itemsPerPage = 10;
  requisitions: any[] = [];
  constructor(
    private router: Router,
    private requisitionService: RequisitionService
  ) {}

  ngOnInit(): void {
    this.requisitionService
      .calculateTotalPages(`${this.itemsPerPage}`)
      .subscribe((data) => {
        this.totalPages = data.numberOfPages;
        if (data.leftoverItems > 0) {
          this.totalPages++;
          this.leftoverItems = data.leftoverItems;
        }
        this.requisitionService
          .loadRequisitions(`${this.currentPage}`, `${this.itemsPerPage}`)
          .subscribe((requisitions) => {
            this.requisitions = requisitions;
          });
      });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.requisitionService
        .loadRequisitions(`${this.currentPage}`, `${this.itemsPerPage}`)
        .subscribe((requisitions) => (this.requisitions = requisitions));
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.requisitionService
        .loadRequisitions(`${this.currentPage}`, `${this.itemsPerPage}`)
        .subscribe((requisitions) => (this.requisitions = requisitions));
    }
  }

  viewRequisition(requisitionId: number, createdAt: string) {
    this.router.navigate(['/requisition', requisitionId, createdAt]);
  }
}
