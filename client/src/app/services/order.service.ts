import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private createOrderUrl = '/api/order/create'
    private getOrdersUrl = '/api/orders/'
    private cancelOrderUrl = '/api/order/cancel/'
    private getOrderUrl = '/api/order/'

    constructor(private http: HttpClient) { }

    placeNewOrder(payload: any) {
        return this.http.post(this.createOrderUrl, payload);
    }

    getOrdersByUserId(userId: number) {
        return this.http.get(this.getOrdersUrl + userId);
    }

    cancelOrder(orderId: number) {
        return this.http.get(this.cancelOrderUrl + orderId);
    }

    getOrderByOrderId(orderId:number) {
        return this.http.get(this.getOrderUrl + orderId)
    }
}
