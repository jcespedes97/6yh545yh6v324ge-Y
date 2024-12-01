import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { NavBarComponent, NavItem } from '../nav-bar/nav-bar.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { FhirClientService } from '../../services/fhirclient-service/fhir-client.service';
import { SurveyApiService } from '../../services/api/survey/survey-api.service';

@Component({
  selector: 'app-provider-page',
  standalone: true,
  imports: [
    StepperModule,
    SelectButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    CommonModule,
    CardModule,
    FormsModule,
    NavBarComponent,
    HeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './provider-page.component.html',
  styleUrl: './provider-page.component.css',
})
export class ProviderPageComponent implements OnInit {
  providerNav: NavItem[] = [
    {
      title: 'Home',
      link: '/provider/home',
    },
    {
      title: 'Report',
      link: '/provider/report',
    },
    {
      title: 'Analytics',
      link: '/provider/analytics',
    },
    {
      title: 'Surveys',
      link: '/provider/surveys',
    },
  ];

  constructor(
    private fhirClient: FhirClientService,
    private surveyApi: SurveyApiService,
  ) {
    this.fhirClient.readyClient();
  }

  ngOnInit() {
    this.surveyApi.initializeData().subscribe((x) => {
      console.log('Data initialized');
    });
  }
}
