import { TestBed } from '@angular/core/testing';

import { BroadsService } from './broads.service';

describe('BroadsService', () => {
  let service: BroadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BroadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
