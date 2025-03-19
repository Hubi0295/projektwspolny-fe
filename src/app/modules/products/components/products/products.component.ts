import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { PrimitiveProduct } from '../../../core/models/product.model';
import { ProductsService } from '../../../core/services/products.service';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit, OnDestroy{
  ngAfterViewInit(): void {
    // this.productService.getProducts().subscribe({
    //   next: ({ products, totalCount })=>{
    //     this.products = [...products];
    //     this.totalCount = totalCount;
    //   }
    // });
    this.route.queryParamMap
      .pipe(
        switchMap((queryMap) =>{
          const pageIndex = queryMap.get('strona') ? Number(queryMap.get('strona')) : 1
          const itemsPerPage = queryMap.get('limit') ? Number(queryMap.get('limit')) : this.paginator.pageSize
          return this.productService.getProducts(pageIndex, itemsPerPage)
        }),
        map(({products,totalCount})=>{
          this.totalCount = totalCount;
          this.products = [...products];
        })
      )
      .subscribe({
        error: (err) =>{
          this.errorMessage = err;
        }
      })
    this.sub.add(this.paginator.page.subscribe({
      next: () => {
        const pageIndex = this.paginator.pageIndex+1;
        const itemsPerPage = this.paginator.pageSize;
        this.router.navigate([],{
          relativeTo: this.route,
          queryParams: {strona: pageIndex, limit: itemsPerPage}
        })
      }
    }));
  }
  products: PrimitiveProduct[]=[]
  totalCount = 0;
  sub = new Subscription();
  errorMessage: string | null = null;
  @ViewChild(MatPaginator) paginator !: MatPaginator;


  constructor(private productService: ProductsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
    }

}
