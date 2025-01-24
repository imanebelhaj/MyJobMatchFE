import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileCComponent } from './edit-profile-c.component';

describe('EditProfileCComponent', () => {
  let component: EditProfileCComponent;
  let fixture: ComponentFixture<EditProfileCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProfileCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
