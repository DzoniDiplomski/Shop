import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRequisitionsComponent } from './all-requisitions.component';

describe('AllRequisitionsComponent', () => {
  let component: AllRequisitionsComponent;
  let fixture: ComponentFixture<AllRequisitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRequisitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRequisitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
