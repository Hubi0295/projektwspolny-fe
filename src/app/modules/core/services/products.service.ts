import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GetProductsResponse, PrimitiveProduct, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) { }

  getProduct(name: string, date: string): Observable<Product>{
    const params = new HttpParams().append('name_like',name).append('data',date);
    return this.http.get<Product>(`${this.apiUrl}`, {
      params,
    })
  }

  getProducts(pageIndex: number =1, itemsPerPage: number=5, name: string | null = null, sortElement: string | null = null, orderElement: string | null = null, category: string | null = null): Observable<GetProductsResponse>{
    let params = new HttpParams()
      .append('_page', pageIndex)
      .append('_limit',itemsPerPage)
    if (name) {
      params = params.append('name_like', name)
    }
    if(sortElement){
      params = params.append('_sort', sortElement)
    }
    if(orderElement){
      params = params.append('_order', orderElement)
    }
    if(category){
      params = params.append('_category', category)
    }
    return this.http.get<PrimitiveProduct[]>(`${this.apiUrl}`,{
      observe: 'response',
      params
    }).pipe(
      map((response) => {
        if (!response.body) return {products: [], totalCount: 0}
        const totalCount = Number(response.headers.get('X-total-Count'));
        return {products: [...response.body], totalCount}
      })
    );

  }
}
