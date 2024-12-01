import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SurveyApiService } from '../../services/api/survey/survey-api.service';
import {
  Coordinates,
  Survey,
  SurveyAnswer,
  SurveyQuestion,
  SurveyResultsCreate,
} from '../../models/survey.model';
import { CommonModule, NgForOf } from '@angular/common';
import { Stepper, StepperModule } from 'primeng/stepper';
import { Button } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SurveyAnswerForm, SurveyForm } from '../../models/form-defines.model';
import { SubscriptionLike } from 'rxjs';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { Patient } from 'fhir/r4';

@Component({
  selector: 'app-survey-page',
  standalone: true,
  imports: [
    NgForOf,
    StepperModule,
    Button,
    SelectButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    CommonModule,
    CardModule,
    RadioButtonModule,
    InputTextModule,
  ],
  templateUrl: './survey-page.component.html',
  styleUrl: './survey-page.component.css',
})
export class SurveyPageComponent implements OnInit {
  @Input()
  patient: Patient | null | undefined = null;

  @Output()
  submitted: EventEmitter<void> = new EventEmitter();

  @ViewChild('stepper', { static: true })
  stepper!: Stepper;

  surveys: Survey[] = [];

  surveyForm: FormGroup = this.fb.nonNullable.group<SurveyForm>({
    selectedSurvey: new FormControl<Survey | null>(null, {
      validators: Validators.required,
    }),
    surveyQuestions: this.fb.array<FormGroup<SurveyAnswerForm>>([]),
  });

  subs: SubscriptionLike[] = [];

  loading = false;

  coords: Coordinates | undefined;

  constructor(
    private fb: FormBuilder,
    private surveyApi: SurveyApiService,
    private router: Router,
  ) {}

  get surveyQuestions(): FormArray<FormControl<SurveyAnswer>> {
    return this.surveyForm.get('surveyQuestions') as FormArray<
      FormControl<SurveyAnswer>
    >;
  }

  ngOnInit() {
    this.surveyApi.getActiveSurveys().subscribe((surveys) => {
      this.surveys = surveys;
    });

    this.getLocation();

    this.subs.push(
      this.surveyForm
        .get('selectedSurvey')!
        .valueChanges.subscribe((survey: Survey) => {
          if (!survey) {
            return;
          }
          this.surveyForm.setControl(
            'surveyQuestions',
            this.buildSurveyAnswers(survey.questions),
          );
        }),
    );
  }

  buildSurveyAnswers(
    questions: SurveyQuestion[],
  ): FormArray<FormGroup<SurveyAnswerForm>> {
    const controls = questions.map((question) => {
      const validators = question.isRequired ? Validators.required : null;
      return this.fb.nonNullable.group<SurveyAnswerForm>({
        questionId: new FormControl<string>(question.id),
        answer: new FormControl<string>('', validators),
      });
    });
    return this.fb.array<FormGroup<SurveyAnswerForm>>(controls);
  }

  getQuestion(id: string | null): SurveyQuestion | undefined {
    if (!id) {
      return undefined;
    }
    const survey = this.surveyForm.get('selectedSurvey')?.value as Survey;
    return survey.questions.find((x) => x.id === id);
  }

  submit() {
    this.loading = true;
    const results = this.formatSurveyResults();
    console.log(results);
    this.surveyApi.postSurveyResults(results).subscribe((complete) => {
      this.loading = false;
      this.submitted.emit();
      this.surveyForm.reset();
      this.stepper.activeStep = 0;
    });
  }

  formatSurveyResults(): SurveyResultsCreate {
    return {
      surveyId: this.surveyForm.get('selectedSurvey')?.value.id,
      isAnonymous: true, // TODO add check for authentication,
      surveyAnswers: this.surveyQuestions.controls.map((ctrl) => ctrl.value),
      patientId: this.patient?.id,
      location: this.coords,
    };
  }

  getLocation() {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      },
      (error) => {
        console.error(error);
      },
    );
  }
}
