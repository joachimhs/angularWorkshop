import { TestBed } from '@angular/core/testing';

import { PrimusStoreService } from './primus-store.service';

describe('PrimusStoreService', () => {
  let service: PrimusStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimusStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
