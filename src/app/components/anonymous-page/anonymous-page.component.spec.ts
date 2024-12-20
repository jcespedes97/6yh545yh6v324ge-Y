import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousPageComponent } from './anonymous-page.component';

describe('AnonymousPageComponent', () => {
  let component: AnonymousPageComponent;
  let fixture: ComponentFixture<AnonymousPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnonymousPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnonymousPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
