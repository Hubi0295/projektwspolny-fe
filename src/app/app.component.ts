import {Component, OnInit} from '@angular/core';
import {AppState} from "./store/app.reducer";
import * as AuthActions from '../app/modules/auth/store/auth.actions'
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'projekt-wspolny-fe';
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
        this.store.dispatch(AuthActions.autoLogin());
    }
}
