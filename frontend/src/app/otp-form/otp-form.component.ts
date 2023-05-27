import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.css']
})
export class OtpFormComponent implements OnInit {

  otpForm = new FormGroup({
    email : new FormControl('', [Validators.email, Validators.required]),
  })

  constructor(private formBuilder: FormBuilder , private http: HttpClient, private router: Router) { }

  ngOnInit() {
    
  }

  get register():any{
    return this.otpForm.controls;
  }

  onSubmit() {
    if (this.otpForm.invalid) {
      return;
    }

    const email = this.otpForm.value.email;
    this.http.post('/api/send-otp', { email }).subscribe(
      (response: any) => {
        console.log(response);
        // Handle the success response here, e.g., show a success message to the user
      },
      (error: any) => {
        console.log(error);
        // Handle the error response here, e.g., show an error message to the user
      }
    );
  }

  navigateToOtpSubmission() {
    this.router.navigate(['submit-otp']);
  }
}