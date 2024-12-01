import { Component, OnInit } from '@angular/core';
import { SurveyPageComponent } from '../../survey-page/survey-page.component';
import { PatientInfoComponent } from '../../patient-info/patient-info.component';
import { ProviderApiService } from '../../../services/api/provider/provider-api.service';
import { TableModule } from 'primeng/table';
import { DatePipe, NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FhirClientService } from '../../../services/fhirclient-service/fhir-client.service';
import { catchError, of, switchMap } from 'rxjs';
import Client from 'fhirclient/lib/Client';
import { CardModule } from 'primeng/card';
import { Bundle, BundleLink, Patient } from 'fhir/r4';

@Component({
  selector: 'app-provider-reporting',
  standalone: true,
  imports: [
    SurveyPageComponent,
    PatientInfoComponent,
    TableModule,
    DatePipe,
    Button,
    TooltipModule,
    ProgressSpinnerModule,
    NgIf,
    DialogModule,
    InputTextModule,
    CardModule,
  ],
  templateUrl: './provider-reporting.component.html',
  styleUrl: './provider-reporting.component.css',
})
export class ProviderReportingComponent implements OnInit {
  patientBundle: Bundle | undefined;

  patients: Patient[] = [];

  loadingPatients = false;

  patientDialogVisible = false;

  selectedPatient: Patient | null = null;

  patientReportDialogVisible = false;

  nextLink: BundleLink | undefined;
  previousLink: BundleLink | undefined;

  constructor(
    private providerApiService: ProviderApiService,
    private fhirClient: FhirClientService,
  ) {}

  ngOnInit() {
    this.loadingPatients = true;
    this.providerApiService.getAllPatients().subscribe((x) => {
      this.updatePatientBundle(x);
    });
  }

  getPatientName(patient: any) {
    const nameProperties = patient.name[0];
    return `${nameProperties.family} , ${nameProperties.given}`;
  }

  viewPatient(patient: Patient) {
    this.selectedPatient = patient;
    this.patientDialogVisible = true;
  }

  closePatientDialog() {
    this.selectedPatient = null;
    this.patientDialogVisible = false;
  }

  closeReportDialog() {
    this.patientReportDialogVisible = false;
    this.selectedPatient = null;
  }

  showReportDialog(patient: Patient) {
    this.selectedPatient = patient;
    this.patientReportDialogVisible = true;
  }

  nextPage() {
    this.loadingPatients = true;
    this.fhirClient
      .getClient()
      .pipe(
        switchMap((client: Client | null) => {
          if (!client) {
            return of(null);
          }
          return client.request(this.nextLink!.url);
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        }),
      )
      .subscribe((x: Bundle | null) => {
        if (!x) {
          this.loadingPatients = false;
          return;
        }
        this.updatePatientBundle(x);
      });
  }

  previousPage() {
    this.loadingPatients = true;
    this.fhirClient
      .getClient()
      .pipe(
        switchMap((client: Client | null) => {
          if (!client) {
            return of(null);
          }
          return client.request(this.previousLink!.url);
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        }),
      )
      .subscribe((x: Bundle | null) => {
        if (!x) {
          this.loadingPatients = false;
          return;
        }
        this.updatePatientBundle(x);
      });
  }

  private updatePatientBundle(x: Bundle) {
    this.patientBundle = x;
    this.patients =
      this.patientBundle.entry?.map((entry) => {
        return entry.resource as Patient;
      }) ?? [];
    this.nextLink = x.link?.find((link) => link.relation === 'next');
    this.previousLink = x.link?.find((link) => link.relation === 'previous');
    this.loadingPatients = false;
  }
}
