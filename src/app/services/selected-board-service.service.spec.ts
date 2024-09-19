import { TestBed } from '@angular/core/testing';

import { SelectedBoardServiceService } from './selected-board-service.service';

describe('SelectedBoardServiceService', () => {
  let service: SelectedBoardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedBoardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
