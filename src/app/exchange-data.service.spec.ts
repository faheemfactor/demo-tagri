import { TestBed } from '@angular/core/testing';

import { ExchangeDataService } from './exchange-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExchangeDataService', () => {
  let service: ExchangeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });
    service = TestBed.inject(ExchangeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
