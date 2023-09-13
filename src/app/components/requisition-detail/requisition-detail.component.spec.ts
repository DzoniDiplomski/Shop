import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionDetailComponent } from './requisition-detail.component';

describe('RequisitionDetailComponent', () => {
  let component: RequisitionDetailComponent;
  let fixture: ComponentFixture<RequisitionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
