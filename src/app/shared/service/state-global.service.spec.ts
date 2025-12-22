import { TestBed } from '@angular/core/testing';

import { StateGlobalService } from './state-global.service';

describe('StateGlobalService', () => {
  let service: StateGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
