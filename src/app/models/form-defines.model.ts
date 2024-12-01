import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Survey } from './survey.model';

export interface SurveyForm {
  selectedSurvey: FormControl<Survey | null>;
  surveyQuestions: FormArray<FormGroup<SurveyAnswerForm>>;
}

export interface SurveyAnswerForm {
  questionId: FormControl<string | null>;
  answer: FormControl<string | null>;
}

export interface SurveyEditForm {
  name: FormControl<string>;
  active: FormControl<boolean>;
  code: FormControl<string>;
  requiredScore: FormControl<number>;
  questions: FormArray<FormGroup<QuestionEditForm>>;
}

export interface QuestionEditForm {
  type: FormControl<string>;
  title: FormControl<string>;
  isRequired: FormControl<boolean>;
  options: FormArray<FormGroup<QuestionOptionForm>>;
}

export interface QuestionOptionForm {
  key: FormControl<string>;
  value: FormControl<string>;
  scoreValue: FormControl<number>;
}
