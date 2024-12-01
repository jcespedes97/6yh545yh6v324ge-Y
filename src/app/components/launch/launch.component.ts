import { Component, OnInit } from '@angular/core';
import { FhirClientService } from '../../services/fhirclient-service/fhir-client.service';
import { ActivatedRoute, Router } from '@angular/router';

const LaunchQueryParamName = 'launchType';

@Component({
  selector: 'app-launch',
  standalone: true,
  imports: [],
  templateUrl: './launch.component.html',
  styleUrl: './launch.component.css',
})
export class LaunchComponent implements OnInit {
  constructor(
    private fhirClient: FhirClientService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const authType = params.get(LaunchQueryParamName);
      if (!authType) {
        throw new Error('No auth type provided');
      }
      this.fhirClient.authorize(authType);
    });
  }
}
