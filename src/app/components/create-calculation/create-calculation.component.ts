import { Component, OnInit } from '@angular/core';
import { CalculationService } from 'src/app/service/calculation/calculation.service';

@Component({
  selector: 'app-create-calculation',
  templateUrl: './create-calculation.component.html',
  styleUrls: ['./create-calculation.component.css'],
})
export class CreateCalculationComponent implements OnInit {
  calculation: any = {
    id: 0,
    provider: '',
    items: [
      {
        sif: 0,
        neto: 0,
        margin: 0,
        quantity: 0,
        pdv: 0,
      },
    ],
  };

  constructor(private calculationService: CalculationService) {}

  addProduct(): void {
    this.calculation.items.push({
      sif: 0,
      neto: 0,
      margin: 0,
      quantity: 0,
      pdv: 0,
    });
  }

  createCalculation(): void {
    this.calculationService.createCalculation(this.calculation).subscribe(
      () => {
        alert('Successfully created a calculation');
      },
      (error) => {
        console.error('Could not create a calculation', error);
      }
    );
  }

  ngOnInit(): void {}
}
