import {Injectable} from "@angular/core";
import {AuthService} from "../../core/services/auth.service";
import {Actions} from "@ngrx/effects";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private authService: AuthService) {}
}
