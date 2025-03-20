import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PrimitiveProduct } from '../../../core/models/product.model';
import { ProductsService } from '../../../core/services/products.service';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy{
  products: PrimitiveProduct[]=[]
  totalCount = 0;
  sub = new Subscription();
  errorMessage: string | null = null;
  searchControl = new FormControl<string>('');
  sortControl = new FormControl<string>('');
  orderControl = new FormControl<string>('');
  filteredOptions!: Observable<PrimitiveProduct[]>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  constructor(private productService: ProductsService, private route: ActivatedRoute, private router: Router) {
  }



  ngOnInit() {
      this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => this.productService.getProducts(1,10,value)),
        map(({ products }) => {
          return [...products];
        })
    );
  }


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
          const productName = queryMap.get('nazwa') ?  queryMap.get('nazwa') : null;
          const sortElement = queryMap.get('sortuj_po') ?  queryMap.get('sortuj_po') : null;
          const orderElement = queryMap.get('sortuj') ?  queryMap.get('sortuj') : null;
          const category = queryMap.get('kategoria') ?  queryMap.get('kategoria') : null;

          return this.productService.getProducts(pageIndex, itemsPerPage, productName,sortElement,orderElement,category)
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
        this.navigateToSearchedParams();
      }
    }));
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
    }

  searchProducts() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.navigateToSearchedParams();

  }

  navigateToSearchedParams(){
    const queryParams:{ [key: string] : string | number} = {
      strona: this.paginator.pageIndex + 1, limit: this.paginator.pageSize
    };
    const category = this.route.snapshot.queryParamMap.get('kategoria')
    if(this.searchControl.value){
      queryParams['nazwa']=this.searchControl.value;
    }
    if(this.sortControl.value){
      queryParams['sortuj_po'] = this.sortControl.value;
    }
    if(this.orderControl.value){
      queryParams['sortuj'] = this.orderControl.value;
    }
    if(category){
      queryParams['kategoria'] = category
    }
    this.router.navigate([],{
      relativeTo: this.route,
      queryParams
    })
  }
}
