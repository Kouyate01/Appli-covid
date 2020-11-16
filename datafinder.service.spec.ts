import { TestBed } from '@angular/core/testing';

import { DatafinderService } from './datafinder.service';

describe('DatafinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatafinderService = TestBed.get(DatafinderService);
    expect(service).toBeTruthy();
  });
});
