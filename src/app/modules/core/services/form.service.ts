import { Injectable } from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import { AddCategoryForm, LoginForm, PasswdRecoveryForm, PasswordsForm, RegisterForm } from '../models/forms.model';
import {equivalentValidator} from "../../shared/validators/equivalent.validator";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  initAddCategoryForm(): FormGroup<AddCategoryForm>{
    return new FormGroup({
      name: new FormControl('',{
        validators: [Validators.required],
        nonNullable: true
    }),
  });
  }

  initPasswdRecoveryForm(): FormGroup<PasswdRecoveryForm>{
    return new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.email,
          Validators.required],
        nonNullable: true
      }),
    });
  }
  initPasswordsForm(): FormGroup<PasswordsForm>{
    return new FormGroup({
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(75)
        ],
        nonNullable: true
      }),
      repeatedPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(75)
        ],
        nonNullable: true
      }),
    }, {validators: [equivalentValidator('password','repeatedPassword')]}
    );
  }

  initLoginForm(): FormGroup<LoginForm>{
    return new FormGroup({
      login: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)],
        nonNullable: true
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(75)
        ],
        nonNullable: true
      }),
    })
  }
  initRegisterForm(): FormGroup<RegisterForm>{
    return new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.email,
          Validators.required],
        nonNullable: true
      }),
      login: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)],
        nonNullable: true
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(75)
        ],
        nonNullable: true
      }),
      repeatedPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(75)
        ],
        nonNullable: true
      }),
    })
  }
  getErrorMessage(control: FormControl): string{
    if (control.hasError('required')) {
      return 'ta kontrolka jest wymagana';
    }
    if (control.hasError('minlength')) {
      return `Minimalna ilosc znakow: ${control.errors?.['minlength']?.requiredLength}`;
    }
    if (control.hasError('maxlength')) {
      return `Maksymalna ilosc znakow: ${control.errors?.['maxlength']?.requiredLength}`;
    }
    if (control.hasError('email')) {
      return `Niepoprawny adres email`;
    }
    if(control.hasError('passwordsNotEqual')){
      return 'Hasła muszą być identyczne';
    }
    return ''
  }

}
