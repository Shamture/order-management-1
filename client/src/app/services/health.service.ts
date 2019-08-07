import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HealthService {
    private serverHealthUrl = '/api/health';
    private orderAPIUrl = '/api/orders/';
    private paymentAPIUrl = '/api/payments/'

    constructor(private http: HttpClient) { }

    getServerHealth() {
        return this.http.get(this.serverHealthUrl);
    }

    getPaymentHealth(userId) {
        return this.http.get(this.paymentAPIUrl + userId)
    }

    getOrderHealth(userId) {
        return this.http.get(this.orderAPIUrl + userId);
    }
}
