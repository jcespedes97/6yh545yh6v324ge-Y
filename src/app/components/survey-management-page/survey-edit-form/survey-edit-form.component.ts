import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  Survey,
  SurveyQuestion,
  SurveyQuestionOption,
} from '../../../models/survey.model';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  QuestionEditForm,
  QuestionOptionForm,
  SurveyEditForm,
} from '../../../models/form-defines.model';
import { CheckboxModule } from 'primeng/checkbox';
import { NgForOf } from '@angular/common';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SubscriptionLike } from 'rxjs';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-survey-edit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CheckboxModule,
    NgForOf,
    Button,
    InputTextModule,
    DividerModule,
  ],
  templateUrl: './survey-edit-form.component.html',
  styleUrl: './survey-edit-form.component.css',
})
export class SurveyEditFormComponent implements OnInit, OnDestroy {
  @Input() survey: Survey | null = null;

  @Output()
  surveyValueChanged: EventEmitter<Partial<Survey> | null> = new EventEmitter();

  surveyForm: FormGroup<SurveyEditForm>;

  surveySub: SubscriptionLike | undefined;

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.createSurveyEditForm();
  }

  get surveyFormQuestions() {
    return this.surveyForm.controls.questions.controls;
  }

  getQuestionOptions(question: FormGroup<QuestionEditForm>) {
    return question.controls.options.controls;
  }

  ngOnInit() {
    this.surveyForm.valueChanges.subscribe((value) => {
      this.surveyValueChanged.emit(this.buildSurveyObject());
    });
  }

  ngOnDestroy() {
    this.surveySub?.unsubscribe();
  }

  createSurveyEditForm(): FormGroup<SurveyEditForm> {
    return this.fb.nonNullable.group<SurveyEditForm>({
      name: this.fb.nonNullable.control<string>('', Validators.required),
      active: this.fb.nonNullable.control<boolean>(true),
      code: this.fb.nonNullable.control<string>('', Validators.required),
      requiredScore: this.fb.nonNullable.control<number>(
        100,
        Validators.required,
      ),
      questions: this.fb.nonNullable.array<FormGroup<QuestionEditForm>>(
        [],
        Validators.required,
      ),
    });
  }

  createQuestionEditForm(): FormGroup<QuestionEditForm> {
    return this.fb.group<QuestionEditForm>({
      type: this.fb.nonNullable.control<string>('categorical'),
      title: this.fb.nonNullable.control<string>('', Validators.required),
      isRequired: this.fb.nonNullable.control<boolean>(true),
      options: this.fb.nonNullable.array<FormGroup<QuestionOptionForm>>(
        [],
        Validators.required,
      ),
    });
  }

  createQuestionOptionForm(): FormGroup<QuestionOptionForm> {
    return this.fb.group<QuestionOptionForm>({
      key: this.fb.nonNullable.control<string>('', Validators.required),
      value: this.fb.nonNullable.control<string>('', Validators.required),
      scoreValue: this.fb.nonNullable.control<number>(0),
    });
  }

  addQuestion() {
    const questionForm = this.createQuestionEditForm();
    (this.surveyForm.controls.questions as FormArray).push(questionForm);
  }

  addOption(questionIndex: number) {
    const optionForm = this.createQuestionOptionForm();
    const questionsArray = this.surveyForm.controls.questions as FormArray;
    const questionForm = questionsArray.at(
      questionIndex,
    ) as FormGroup<QuestionEditForm>;
    questionForm.controls.options.push(optionForm);
  }

  removeQuestion(index: number) {
    (this.surveyForm.get('questions') as FormArray).removeAt(index);
  }

  removeOption(index: number, optionIndex: number) {
    const question = (this.surveyForm.get('questions') as FormArray).at(
      index,
    ) as FormGroup<QuestionEditForm>;
    question.controls.options.removeAt(optionIndex);
  }

  private buildSurveyObject(): Survey {
    const survey: Partial<Survey> = {
      name: this.surveyForm.controls.name.value,
      active: this.surveyForm.controls.active.value,
      code: this.surveyForm.controls.code.value,
      requiredScore: this.surveyForm.controls.requiredScore.value,
      questions: this.surveyForm.controls.questions.value.map(
        (questionGroup) => {
          const question: Partial<SurveyQuestion> = {
            // TODO update this
            type: 'categorical',
            title: questionGroup.title,
            isRequired: questionGroup.isRequired,
            options:
              questionGroup.options?.map((optionGroup) => {
                return {
                  key: optionGroup.key,
                  value: optionGroup.value,
                  scoreValue: optionGroup.scoreValue,
                  isDeleted: false,
                } as SurveyQuestionOption;
              }) ?? [],
          };
          return question as SurveyQuestion;
        },
      ),
    };

    return survey as Survey;
  }
}
