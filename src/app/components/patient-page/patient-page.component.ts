import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';

import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { NavBarComponent, NavItem } from '../nav-bar/nav-bar.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { FhirClientService } from '../../services/fhirclient-service/fhir-client.service';
import { PatientPageService } from './patient-page.service';
import { SurveyApiService } from '../../services/api/survey/survey-api.service';

@Component({
  selector: 'app-patient-page',
  standalone: true,
  imports: [
    StepperModule,
    SelectButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    CommonModule,
    CardModule,
    DividerModule,
    HeaderComponent,
    NavBarComponent,
    RouterOutlet,
  ],
  templateUrl: './patient-page.component.html',
  styleUrl: './patient-page.component.css',
})
export class PatientPageComponent implements OnInit {
  nav: NavItem[] = [
    {
      title: 'Home',
      link: '/patient/home',
    },
    {
      title: 'Report',
      link: '/patient/report',
    },
  ];

  constructor(
    private fhirClient: FhirClientService,
    private patientPageService: PatientPageService,
    private surveyApi: SurveyApiService,
  ) {
    this.fhirClient.readyClient();
  }

  ngOnInit() {
    this.patientPageService.hydratePatientData();
    this.surveyApi.initializeData().subscribe((x) => {
      console.log('Data initialized');
    });
  }
}
