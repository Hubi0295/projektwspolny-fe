import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FormService} from "../../../core/services/form.service";
import {PasswdRecoveryForm} from "../../../core/models/forms.model";

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent {
  passwdRecoveryForm: FormGroup<PasswdRecoveryForm> = this.formService.initPasswdRecoveryForm();
  constructor(private formService: FormService) {

  }

  getErrorMessage(email: FormControl<string>) {
    return this.formService.getErrorMessage(email);
  }
}
