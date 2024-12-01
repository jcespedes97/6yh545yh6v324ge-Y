export interface Survey {
  id: string;
  name: string;
  questions: SurveyQuestion[];
  code: string;
  active: boolean;
  isDeleted: boolean;
  requiredScore: number;
}

export interface SurveyQuestion {
  id: string;
  type: SurveyQuestionType;
  title: string;
  options?: SurveyQuestionOption[];
  isRequired: boolean;
  isDeleted: boolean;
}

export interface SurveyQuestionOption {
  key: string;
  value: string;
  isDeleted: Boolean;
  scoreValue: Number;
}

export type SurveyQuestionType = 'categorical' | 'open-entry';

export interface SurveyAnswer {
  questionId: string | null;
  answer: string | null;
}

export interface SurveyResultsCreate {
  isAnonymous: boolean;
  surveyId: string;
  surveyAnswers: SurveyAnswer[];
  patientId?: string;
  location?: Coordinates;
}

export interface Coordinates {
  longitude: number;
  latitude: number;
}
