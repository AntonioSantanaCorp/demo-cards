import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly _httpClient = inject(HttpClient);

  getProducts() {
    return this._httpClient.get<Product[]>('http://localhost:8000/products');
  }
}
