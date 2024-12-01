import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyManagementPageComponent } from './survey-management-page.component';

describe('SurveyManagementPageComponent', () => {
  let component: SurveyManagementPageComponent;
  let fixture: ComponentFixture<SurveyManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
