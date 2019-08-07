import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HealthService {
    private serverHealthUrl = '/api/health';
    

    constructor(private http: HttpClient) { }

    getServerHealth() {
        return this.http.get(this.serverHealthUrl);
    }
}
