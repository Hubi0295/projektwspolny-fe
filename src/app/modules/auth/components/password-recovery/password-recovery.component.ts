import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FormService} from "../../../core/services/form.service";
import {PasswdRecoveryForm} from "../../../core/models/forms.model";
import {AuthService} from "../../../core/services/auth.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent {
  passwdRecoveryForm: FormGroup<PasswdRecoveryForm> = this.formService.initPasswdRecoveryForm();
  errorMessage : null| string = null;
  constructor(private formService: FormService, private authService: AuthService, private notifierService: NotifierService) {

  }

  getErrorMessage(email: FormControl<string>) {
    return this.formService.getErrorMessage(email);
  }

  onPasswdRecovery() {
    this.authService.resetPassword(this.passwdRecoveryForm.getRawValue()).subscribe({
      next: ()=> {
        this.notifierService.notify('success','Jesli podano prawidowloego maila to zostala wyslana na niego wiadomosc');
      },
      error:(err) =>{
        this.errorMessage = err;
    }
    })
  }
}
