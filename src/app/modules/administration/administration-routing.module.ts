import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { AddCategoryFormComponent } from './components/administrator/add-category-form/add-category-form.component';
import { ManageProductsComponent } from './components/administrator/manage-products/manage-products.component';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Routes = [{
  path: 'zarzadzaj',
  component: AdministratorComponent,
  canActivate: [AdminGuard],
  children: [
    {
      path: 'kategorie',component: AddCategoryFormComponent,
    },
    {
      path: 'produkty',component: ManageProductsComponent,
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
