import { TestBed } from '@angular/core/testing';

import { PatientPageService } from './patient-page.service';

describe('PatientPageService', () => {
  let service: PatientPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
