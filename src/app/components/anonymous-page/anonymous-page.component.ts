import { Component } from '@angular/core';
import { SurveyPageComponent } from '../survey-page/survey-page.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anonymous-page',
  standalone: true,
  imports: [SurveyPageComponent],
  templateUrl: './anonymous-page.component.html',
  styleUrl: './anonymous-page.component.css',
})
export class AnonymousPageComponent {
  constructor(public router: Router) {}
}
