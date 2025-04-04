import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as AuthActions from '../../../auth/store/auth.actions'
import {Observable} from "rxjs";
import {selectAuthUser} from "../../../auth/store/auth.selectors";
import {User} from "../../models/auth.model";
import { Category } from '../../models/categories.model';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  user$: Observable<User| null>  = this.store.select(selectAuthUser)

  categories: Category[] = [
    {name: 'meble', shortId: 12345678},
    {name: 'kuchenne', shortId: 22345678},
  ]

  constructor(private store: Store<AppState>, private categoriesService: CategoriesService, private router: Router) {
  }
  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        console.log(categories)
        this.categories = [...categories];
      }
    })
  }

  navigateToCategory(category: Category) {
    this.router.navigate(['/produkty'],{
      queryParams:{
        kategoria: category.shortId,
      }
    })
  }

  isAdmin(role: string) {
    return role === 'ADMIN';
  }
}
