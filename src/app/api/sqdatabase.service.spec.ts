import { TestBed } from '@angular/core/testing';

import { SqdatabaseService } from './sqdatabase.service';

describe('SqdatabaseService', () => {
  let service: SqdatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqdatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
