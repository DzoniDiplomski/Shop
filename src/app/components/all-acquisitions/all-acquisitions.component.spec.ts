import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAcquisitionsComponent } from './all-acquisitions.component';

describe('AllAcquisitionsComponent', () => {
  let component: AllAcquisitionsComponent;
  let fixture: ComponentFixture<AllAcquisitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAcquisitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAcquisitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
