import {Component, OnDestroy} from '@angular/core';
import {FormService} from "../../../core/services/form.service";
import {FormControl, FormGroup} from "@angular/forms";
import {LoginForm} from "../../../core/models/forms.model";
import * as AuthActions from '../../store/auth.actions'
import {AppState} from "../../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectAuthError, selectAuthLoading} from "../../store/auth.selectors";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnDestroy{
  loginForm: FormGroup<LoginForm> = this.formService.initLoginForm();
  errorMsg$ : Observable<string | null> = this.store.select(selectAuthError);
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  get controls(){
    return this.loginForm.controls;
  }
  constructor(private formService: FormService, private store: Store<AppState>) {
  }

  ngOnDestroy(): void {
        this.store.dispatch(AuthActions.clearError());
    }
  getErrorMessage(control: FormControl){
    return this.formService.getErrorMessage(control);
  }

  onLogin() {
    this.store.dispatch(AuthActions.login({loginData: this.loginForm.getRawValue()}))
  }
}
