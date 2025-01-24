import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileCComponent } from './view-profile-c.component';

describe('ViewProfileCComponent', () => {
  let component: ViewProfileCComponent;
  let fixture: ComponentFixture<ViewProfileCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProfileCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProfileCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
