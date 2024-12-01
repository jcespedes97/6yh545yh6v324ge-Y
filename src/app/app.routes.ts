import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProviderPageComponent } from './components/provider-page/provider-page.component';
import { PatientPageComponent } from './components/patient-page/patient-page.component';
import { LaunchComponent } from './components/launch/launch.component';
import { ProviderHomeComponent } from './components/provider-page/provider-home/provider-home.component';
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component';
import { ProviderReportingComponent } from './components/provider-page/provider-reporting/provider-reporting.component';
import { PatientHomeComponent } from './components/patient-page/patient-home/patient-home.component';
import { PatientReportingComponent } from './components/patient-page/patient-reporting/patient-reporting.component';
import { SurveyManagementPageComponent } from './components/survey-management-page/survey-management-page.component';
import { AnonymousPageComponent } from './components/anonymous-page/anonymous-page.component';

export const routes: Routes = [
  {
    component: LandingPageComponent,
    path: '',
  },
  {
    component: AnonymousPageComponent,
    path: 'anonymous',
    data: { isAnonymous: true },
  },
  {
    component: LandingPageComponent,
    path: 'home',
  },
  {
    component: ProviderPageComponent,
    path: 'provider',
    data: { isAnonymous: true },
    children: [
      {
        component: ProviderHomeComponent,
        path: '',
      },
      {
        component: ProviderHomeComponent,
        path: 'home',
      },
      {
        component: AnalyticsPageComponent,
        path: 'analytics',
      },
      {
        component: ProviderReportingComponent,
        path: 'report',
      },
      {
        component: SurveyManagementPageComponent,
        path: 'surveys',
      },
    ],
  },
  {
    component: PatientPageComponent,
    path: 'patient',
    data: { isAnonymous: true },
    children: [
      {
        component: PatientHomeComponent,
        path: '',
      },
      {
        component: PatientHomeComponent,
        path: 'home',
      },
      {
        component: PatientReportingComponent,
        path: 'report',
      },
    ],
  },
  {
    component: LaunchComponent,
    path: 'launch',
  },
];
