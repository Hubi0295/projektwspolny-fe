import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Category, PostCategory } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrl = `${environment.apiUrl}/category`;
  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }
  addCategory(body: PostCategory): Observable<{ timestamp: string, message: string }>{
    return this.http.post<{ timestamp: string, message: string }>(`${this.apiUrl}`, body,
      {
        withCredentials: true,
      })
  }
}
