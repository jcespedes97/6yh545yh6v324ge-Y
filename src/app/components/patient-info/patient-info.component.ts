import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { ProviderApiService } from '../../services/api/provider/provider-api.service';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SurveyApiService } from '../../services/api/survey/survey-api.service';
import { Survey } from '../../models/survey.model';
import { Observation, Patient } from 'fhir/r4';

export const SurveySystemUrl = 'http://survey-result-code';
const surveyIdExtension = 'survey-id-extension';
const surveyScoreExtension = 'survey-score-extension';

@Component({
  selector: 'app-patient-info',
  standalone: true,
  imports: [TabViewModule, DatePipe, TableModule, TooltipModule],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.css',
})
export class PatientInfoComponent implements OnChanges, OnInit {
  @Input() patient: Patient | null | undefined | any = null;

  name: string | undefined;

  observations: Observation[] | any[] = [];

  surveyObservations: Observation[] = [];

  surveys: Survey[] = [];

  constructor(
    private providerApi: ProviderApiService,
    private surveyApi: SurveyApiService,
  ) {}

  ngOnInit() {
    this.surveyApi.getAllSurveys().subscribe((x) => {
      this.surveys = x;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.patient?.id) {
      return;
    }
    this.providerApi
      .getSinglePatientObservations(this.patient?.id)
      .subscribe((observations) => {
        this.observations =
          observations.entry?.map((x) => x.resource as Observation) ?? [];
        this.surveyObservations =
          this.observations?.filter(
            (x) => x.code.coding[0].system === SurveySystemUrl,
          ) ?? [];
      });

    this.name = this.getPatientName(this.patient);
  }

  getPatientName(patient: any) {
    const nameProperties = patient.name[0];
    return `${nameProperties.family} , ${nameProperties.given}`;
  }

  getSurveyName(surveyObservation: any) {
    const idExtension = surveyObservation.extension[0].extension.find(
      (x: any) => x.url === surveyIdExtension,
    );

    const id = idExtension.valueString;

    if (!id) {
      return 'Unknown';
    }

    return this.surveys.find((x) => x.id === id)?.name ?? 'Unknown';
  }

  getSurveyScore(surveyObservation: any) {
    const scoreExtension = surveyObservation.extension[0].extension.find(
      (x: any) => x.url === surveyScoreExtension,
    );

    const id = scoreExtension.valueInteger;

    return id ?? 'N/A';
  }

  getSurveyCode(obs: any) {
    const idExtension = obs.extension[0].extension.find(
      (x: any) => x.url === surveyIdExtension,
    );
    const id = idExtension.valueString;
    if (!id) {
      return 'Unknown';
    }

    return this.surveys.find((x) => x.id === id)?.code ?? 'Unknown';
  }
}
