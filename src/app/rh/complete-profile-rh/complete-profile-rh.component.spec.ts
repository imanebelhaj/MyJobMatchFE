import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteProfileRhComponent } from './complete-profile-rh.component';

describe('CompleteProfileRhComponent', () => {
  let component: CompleteProfileRhComponent;
  let fixture: ComponentFixture<CompleteProfileRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteProfileRhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteProfileRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
