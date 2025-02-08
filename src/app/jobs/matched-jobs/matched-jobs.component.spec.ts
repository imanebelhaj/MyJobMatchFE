import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedJobsComponent } from './matched-jobs.component';

describe('MatchedJobsComponent', () => {
  let component: MatchedJobsComponent;
  let fixture: ComponentFixture<MatchedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchedJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
