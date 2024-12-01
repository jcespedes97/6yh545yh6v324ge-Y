import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderReportingComponent } from './provider-reporting.component';

describe('ProviderReportingComponent', () => {
  let component: ProviderReportingComponent;
  let fixture: ComponentFixture<ProviderReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderReportingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
