import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private createOrderUrl = '/api/order/create'
    private getOrdersUrl = '/api/orders/'

    constructor(private http: HttpClient) { }

    placeNewOrder(payload: any) {
        return this.http.post(this.createOrderUrl, payload);
    }

    getOrdersByUserId(userId: number) {
        return this.http.get(this.getOrdersUrl + userId);
    }
}
