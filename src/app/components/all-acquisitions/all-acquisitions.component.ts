import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcquisitionService } from 'src/app/service/acquisition/acquisition.service';

@Component({
  selector: 'app-all-acquisitions',
  templateUrl: './all-acquisitions.component.html',
  styleUrls: ['./all-acquisitions.component.css'],
})
export class AllAcquisitionsComponent implements OnInit {
  totalPages = 1;
  currentPage = 1;
  leftoverItems = 0;
  itemsPerPage = 10;
  acquisitions: any[] = [];
  constructor(
    private acquisitionService: AcquisitionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.acquisitionService
      .calculateTotalPages(`${this.itemsPerPage}`)
      .subscribe((data) => {
        this.totalPages = data.numberOfPages;
        if (data.leftoverItems > 0) {
          this.totalPages++;
          this.leftoverItems = data.leftoverItems;
        }
        this.acquisitionService
          .loadAcquisitions(`${this.currentPage}`, `${this.itemsPerPage}`)
          .subscribe((acquisitions) => {
            this.acquisitions = acquisitions;
          });
      });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.acquisitionService
        .loadAcquisitions(`${this.currentPage}`, `${this.itemsPerPage}`)
        .subscribe((acquisitions) => (this.acquisitions = acquisitions));
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.acquisitionService
        .loadAcquisitions(`${this.currentPage}`, `${this.itemsPerPage}`)
        .subscribe((acquisitions) => (this.acquisitions = acquisitions));
    }
  }

  viewAcquisition(acquisitionName: string) {
    this.router.navigate(['/acquisition', acquisitionName]);
  }
}
