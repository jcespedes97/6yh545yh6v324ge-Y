import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { PrimeTemplate } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurveyApiService } from '../../services/api/survey/survey-api.service';
import { Survey } from '../../models/survey.model';
import { AnalyticsApiService } from '../../services/api/analytics/analytics-api.service';
import { SurveyResponse } from '../../models/survey-response.model';
import { NgIf } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { DividerModule } from 'primeng/divider';
import {
  circleMarker,
  LatLng,
  latLng,
  Layer,
  layerGroup,
  LayerGroup,
  Map,
  tileLayer,
} from 'leaflet';

@Component({
  selector: 'app-analytics-page',
  standalone: true,
  imports: [
    ChartModule,
    DropdownModule,
    PrimeTemplate,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    TabViewModule,
    LeafletModule,
    DividerModule,
  ],
  templateUrl: './analytics-page.component.html',
  styleUrl: './analytics-page.component.css',
})
export class AnalyticsPageComponent implements OnInit {
  surveys: Survey[] = [];

  selectedSurvey: Survey | undefined;

  responseData: SurveyResponse[] | undefined | null;

  options = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {},
      },
    },
    scales: {
      x: {
        ticks: {},
        grid: {
          drawBorder: false,
        },
      },
      y: {
        ticks: {},
        grid: {
          drawBorder: false,
        },
      },
    },
  };

  leafletOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909),
  };

  monthData: any;

  leafletLayerGroup: LayerGroup | undefined;

  leafletLayers: Layer[] = [];

  constructor(
    private surveyApi: SurveyApiService,
    private analyticsApi: AnalyticsApiService,
  ) {}

  ngOnInit() {
    this.surveyApi.getAllSurveys().subscribe((surveys) => {
      this.surveys = surveys;
    });
  }

  updateSelectedSurvey(survey: Survey) {
    if (!survey) {
      this.responseData = null;
      return;
    }
    this.analyticsApi
      .getSurveyResponseData(survey.id)
      .subscribe((responseData) => {
        this.responseData = responseData;
        this.monthData =
          this.transformSurveyResponsesToTimeSeries(responseData);
        this.leafletLayerGroup =
          this.transformResponseDataToHeatMap(responseData);
        this.leafletLayers = this.leafletLayerGroup.getLayers();
      });
  }

  transformSurveyResponsesToTimeSeries(surveyResponses: SurveyResponse[]) {
    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const countsPerMonth = new Array(12).fill(0);

    surveyResponses.forEach((response) => {
      const month = new Date(response.dateReported).getMonth();
      countsPerMonth[month]++;
    });

    const datasets = [
      {
        label: 'Survey Responses',
        data: countsPerMonth,
        fill: false,
        tension: 0.4,
      },
    ];

    return {
      labels,
      datasets,
    };
  }

  transformResponseDataToHeatMap(surveyResponses: SurveyResponse[]) {
    const responsesWithLocations = surveyResponses.filter(
      (response) => response.location,
    );

    const mapping = responsesWithLocations.map((response) => {
      return new LatLng(
        response.location!.latitude,
        response.location!.longitude,
      );
    });

    return layerGroup(
      mapping.map((coords) => circleMarker(coords, { radius: 10 })),
    );
  }

  onMapReady(map: Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }
}
