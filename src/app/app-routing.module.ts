import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./modules/auth/components/login/login.component";
import {RegisterComponent} from "./modules/auth/components/register/register.component";
import {AccountActivationComponent} from "./modules/auth/components/account-activation/account-activation.component";
import {PasswordRecoveryComponent} from "./modules/auth/components/password-recovery/password-recovery.component";
import {
  PasswordRecoveryFormComponent
} from "./modules/auth/components/password-recovery-form/password-recovery-form.component";

const routes: Routes = [
  {path:'logowanie', component: LoginComponent},
  {path:'rejestracja', component: RegisterComponent},
  {path:'aktywuj/:uid', component: AccountActivationComponent},
  {path:'odzyskaj-haslo', component: PasswordRecoveryComponent},
  {path:'odzyskaj-haslo/:uid', component: PasswordRecoveryFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
