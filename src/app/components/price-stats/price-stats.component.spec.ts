import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceStatsComponent } from './price-stats.component';

describe('PriceStatsComponent', () => {
  let component: PriceStatsComponent;
  let fixture: ComponentFixture<PriceStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
