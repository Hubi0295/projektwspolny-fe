import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as AuthActions from '../../../auth/store/auth.actions'
import {Observable} from "rxjs";
import {selectAuthUser} from "../../../auth/store/auth.selectors";
import {User} from "../../models/auth.model";
import { Category } from '../../models/categories.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user$: Observable<User| null>  = this.store.select(selectAuthUser)

  categories: Category[] = [
    {name: 'Kategoria1',shortId: 1233123},
    {name: 'Kategoria2',shortId: 2113231},
  ]
  constructor(private store: Store<AppState>) {
  }
  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
