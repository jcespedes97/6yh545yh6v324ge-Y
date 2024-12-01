import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SurveyApiService } from '../../services/api/survey/survey-api.service';
import { Survey } from '../../models/survey.model';
import { NgForOf, NgIf } from '@angular/common';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SurveyEditFormComponent } from './survey-edit-form/survey-edit-form.component';
import { catchError, of, switchMap } from 'rxjs';

interface Column {
  field: string | null;
  header: string;
}

type CurrentSurveyView = 'table' | 'edit';

@Component({
  selector: 'app-survey-management-page',
  standalone: true,
  imports: [
    TableModule,
    NgForOf,
    NgIf,
    SplitButtonModule,
    SurveyEditFormComponent,
  ],
  templateUrl: './survey-management-page.component.html',
  styleUrl: './survey-management-page.component.css',
})
export class SurveyManagementPageComponent implements OnInit {
  currentView: CurrentSurveyView = 'table';

  surveys: Survey[] = [];

  columns: Column[] = [
    {
      header: 'Name',
      field: 'name',
    },
    {
      header: 'Code',
      field: 'code',
    },
    {
      header: 'Active',
      field: 'active',
    },
    {
      header: 'Actions',
      field: null,
    },
  ];

  editingSurvey: Partial<Survey> | Survey | null = null;

  constructor(private surveyApi: SurveyApiService) {}

  ngOnInit() {
    this.surveyApi.getAllSurveys().subscribe((surveys) => {
      this.surveys = surveys;
    });
  }

  delete(survey: Survey) {
    this.surveyApi
      .deleteSurvey(survey)
      .pipe(
        switchMap((resp) => {
          return this.surveyApi.getAllSurveys();
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        }),
      )
      .subscribe((x) => {
        this.surveys = x ?? [];
      });
  }

  toggle(survey: Survey) {
    this.surveyApi
      .toggleSurveyActive(survey)
      .pipe(
        switchMap((resp) => {
          return this.surveyApi.getAllSurveys();
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        }),
      )
      .subscribe((x) => {
        this.surveys = x ?? [];
      });
  }

  create() {
    this.currentView = 'edit';
  }

  cancelEdit() {
    this.currentView = 'table';
    // TODO also clear out form
  }

  save() {
    if (!this.editingSurvey) {
      return;
    }
    this.surveyApi
      .createSurvey(this.editingSurvey as Survey)
      .pipe(
        switchMap((response) => {
          return this.surveyApi.getAllSurveys();
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        }),
      )
      .subscribe((x) => {
        this.surveys = x ?? [];
      });
    this.currentView = 'table';
  }

  updateSurveyValue($event: Partial<Survey> | null) {
    this.editingSurvey = $event;
  }
}
