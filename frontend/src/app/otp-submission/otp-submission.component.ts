import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OtpService } from '../otp.service';
@Component({
  selector: 'app-otp-submission',
  templateUrl: './otp-submission.component.html',
  styleUrls: ['./otp-submission.component.css']
})
export class OtpSubmissionComponent implements OnInit{

  errorMessage!: { message: string; };
  
  otpForm = new FormGroup({
    otp : new FormControl('', [Validators.required]),
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route : ActivatedRoute,
    private otpService: OtpService,
  ) {}

  ngOnInit() {
    
  }

  get otp():any{
    return this.otpForm.controls;
  }

  onSubmit() {
    if (this.otpForm.invalid) {
      return;
    }

    const email = 'example@example.com'; // Replace with the actual email value
    const otp = this.otpForm.value.otp;

    this.otpService.verifyOtp(email, otp).subscribe(
      (response: any) => {
        // OTP matched, redirect to the welcome page
        this.router.navigate(['welcome']);
      },
      (error) => {
        // Invalid OTP, display error message
        this.errorMessage = error.error;
      }
    );
  }
}
