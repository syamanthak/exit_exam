import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpSubmissionComponent } from './otp-submission.component';

describe('OtpSubmissionComponent', () => {
  let component: OtpSubmissionComponent;
  let fixture: ComponentFixture<OtpSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpSubmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
