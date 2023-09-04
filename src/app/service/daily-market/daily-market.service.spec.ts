import { TestBed } from '@angular/core/testing';

import { DailyMarketService } from './daily-market.service';

describe('DailyMarketService', () => {
  let service: DailyMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
