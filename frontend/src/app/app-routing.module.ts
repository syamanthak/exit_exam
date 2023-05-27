import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpFormComponent } from './otp-form/otp-form.component';
import { OtpSubmissionComponent } from './otp-submission/otp-submission.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', component:OtpFormComponent},
  {path:'submit-otp', component:OtpSubmissionComponent},
  {path: 'welcome', component:WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
