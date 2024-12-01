import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getResourceUrl } from '../../../util/api-helpers.util';
import { Survey, SurveyResultsCreate } from '../../../models/survey.model';

@Injectable({
  providedIn: 'root',
})
export class SurveyApiService {
  private resourcePrefix = '/survey';

  constructor(private http: HttpClient) {}

  getAllSurveys() {
    return this.http.get<Survey[]>(this.surveyUrl());
  }

  postSurveyResults(surveyResultsCreate: SurveyResultsCreate) {
    return this.http.post(`${this.surveyUrl()}/submit`, surveyResultsCreate);
  }

  deleteSurvey(survey: Survey) {
    survey.isDeleted = true;
    return this.http.patch(`${this.surveyUrl()}/${survey.id}`, survey);
  }

  toggleSurveyActive(survey: Survey) {
    survey.active = !survey.active;
    return this.http.patch(`${this.surveyUrl()}/${survey.id}`, survey);
  }

  getActiveSurveys() {
    return this.http.get<Survey[]>(`${this.surveyUrl()}/active`);
  }

  createSurvey(survey: Survey) {
    return this.http.post(`${this.surveyUrl()}`, survey);
  }

  initializeData() {
    return this.http.get(`${this.surveyUrl()}/initialize`);
  }

  private surveyUrl() {
    return getResourceUrl(this.resourcePrefix);
  }
}
