import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { oauth2 as SmartClient } from 'fhirclient';
import { FhirClientService } from '../../services/fhirclient-service/fhir-client.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CardModule, Button, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  providerLogin() {
    this.navigateToSMARTLauncher(environment.smartLauncherUrls.provider);
  }

  patientLogin() {
    this.navigateToSMARTLauncher(environment.smartLauncherUrls.patient);
  }

  navigateToSMARTLauncher(smartUrl: string) {
    window.location.href = smartUrl;
  }
}
