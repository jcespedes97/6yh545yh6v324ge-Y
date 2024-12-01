import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getResourceUrl } from '../../../util/api-helpers.util';
import { Bundle, Patient } from 'fhir/r4';

@Injectable({
  providedIn: 'root',
})
export class ProviderApiService {
  private resourcePrefix = '/patient';

  constructor(private http: HttpClient) {}

  getAllPatients() {
    return this.http.get<Bundle>(this.providerUrl());
  }

  getSinglePatient(patientId: string) {
    return this.http.get<Patient>(`${this.providerUrl()}/${patientId}`);
  }

  getSinglePatientObservations(patientId: string) {
    return this.http.get<Bundle>(
      `${this.providerUrl()}/${patientId}/observation`,
    );
  }

  addSurveyObservation(
    patientId: string,
    surveyId: string,
    surveyScore: number,
  ) {
    return this.http.post(`${this.providerUrl()}/${patientId}/observation`, {
      id: surveyId,
      score: surveyScore,
    });
  }

  private providerUrl() {
    return getResourceUrl(this.resourcePrefix);
  }
}
