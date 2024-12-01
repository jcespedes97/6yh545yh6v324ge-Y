import { Component } from '@angular/core';
import { PatientInfoComponent } from '../../patient-info/patient-info.component';
import { PatientPageService } from '../patient-page.service';

@Component({
  selector: 'app-patient-home',
  standalone: true,
  imports: [PatientInfoComponent],
  templateUrl: './patient-home.component.html',
  styleUrl: './patient-home.component.css',
})
export class PatientHomeComponent {
  constructor(public patientPageService: PatientPageService) {}
}
