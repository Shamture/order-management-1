import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private productsUrl = '/api/payments/'

  constructor(private http:HttpClient) { }

  getProducts() {
    return this.http.get(this.productsUrl);
  }

  getProductById(id:Number) {
    return this.http.get(this.productsUrl + id);
  }
}
