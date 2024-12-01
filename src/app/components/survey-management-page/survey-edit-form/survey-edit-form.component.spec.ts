import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyEditFormComponent } from './survey-edit-form.component';

describe('SurveyEditFormComponent', () => {
  let component: SurveyEditFormComponent;
  let fixture: ComponentFixture<SurveyEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
