import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OtpFormComponent } from './otp-form/otp-form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { OtpSubmissionComponent } from './otp-submission/otp-submission.component';

@NgModule({
  declarations: [
    AppComponent,
    OtpFormComponent,
    OtpSubmissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
