import { Injectable } from '@angular/core';
import { FhirClientService } from '../../services/fhirclient-service/fhir-client.service';
import { Patient } from 'fhir/r4';

@Injectable({
  providedIn: 'root',
})
export class PatientPageService {
  patient: Patient | undefined | null;

  constructor(private fhirClient: FhirClientService) {}

  hydratePatientData() {
    this.fhirClient.getPatient().subscribe((patient) => {
      this.patient = patient;
    });
  }
}
