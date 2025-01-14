import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteProfileCComponent } from './complete-profile-c.component';

describe('CompleteProfileCComponent', () => {
  let component: CompleteProfileCComponent;
  let fixture: ComponentFixture<CompleteProfileCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteProfileCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteProfileCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
