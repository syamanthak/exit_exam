import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-otp-submission',
  templateUrl: './otp-submission.component.html',
  styleUrls: ['./otp-submission.component.css']
})
export class OtpSubmissionComponent implements OnInit{
  
  otpForm = new FormGroup({
    otp : new FormControl('', [Validators.required]),
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route : ActivatedRoute,
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

    const otp = this.otpForm.value.otp;
    // Call your OTP verification API here, passing the OTP value
    // You can use Angular's HttpClient module to make the HTTP request
    // Example: this.http.post('/api/verify-otp', { otp }).subscribe(...);

    // Navigate to a different page after successful OTP verification
    this.router.navigate(['success'], { relativeTo: this.route });
  }
}
