import { Coordinates } from './survey.model';

export interface SurveyResponse {
  id: string;
  dateReported: Date;
  surveyId: string;
  reportType: ReportType;
  /**
   * Should be the scored survey/survey total
   */
  confidenceLevel: number;
  location?: Coordinates;
}

export type ReportType = 'anonymous' | 'patient' | 'provider';
