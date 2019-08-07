import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = '/api/products/'

  constructor(private http:HttpClient) { }

  getProducts() {
    return this.http.get(this.productsUrl);
  }

  getProductById(id:Number) {
    return this.http.get(this.productsUrl + id);
  }
}
