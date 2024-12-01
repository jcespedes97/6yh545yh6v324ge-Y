import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SurveyResponse } from '../../../models/survey-response.model';
import { HttpClient } from '@angular/common/http';
import { getResourceUrl } from '../../../util/api-helpers.util';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsApiService {
  private resourcePrefix = '/analytics';

  constructor(private http: HttpClient) {}

  getSurveyResponseData(surveyId: string): Observable<SurveyResponse[]> {
    return this.http.get<SurveyResponse[]>(
      `${this.analyticsUrl()}/survey/${surveyId}`,
    );
  }

  private analyticsUrl() {
    return getResourceUrl(this.resourcePrefix);
  }
}
