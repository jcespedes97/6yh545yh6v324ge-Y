import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReportingComponent } from './patient-reporting.component';

describe('PatientReportingComponent', () => {
  let component: PatientReportingComponent;
  let fixture: ComponentFixture<PatientReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientReportingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
