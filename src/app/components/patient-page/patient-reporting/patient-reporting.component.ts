import { Component } from '@angular/core';
import { PatientPageService } from '../patient-page.service';
import { SurveyPageComponent } from '../../survey-page/survey-page.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-reporting',
  standalone: true,
  imports: [SurveyPageComponent],
  templateUrl: './patient-reporting.component.html',
  styleUrl: './patient-reporting.component.css',
})
export class PatientReportingComponent {
  constructor(
    public patientPageService: PatientPageService,
    public router: Router,
  ) {}
}
