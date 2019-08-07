import { Component, OnInit } from '@angular/core';
import { HealthService } from '../services/health.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    templateUrl: './health.component.html'
})

export class HealthComponent implements OnInit {
    health = {};
    constructor(private healthService: HealthService, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.getUpTime();
        this.getOrderAPIHealth();
        this.getPaymentAPIHealth();

        setInterval(() => {
            this.getUpTime();
        }, 1000);

        setInterval(() => {
            this.getOrderAPIHealth();
            this.getPaymentAPIHealth();
        }, 60000);
    }

    getUpTime() {
        this.healthService.getServerHealth().subscribe((data) => {
            this.health['server-uptime'] = data['uptime'];
        });
    }

    getOrderAPIHealth() {
        this.healthService.getOrderHealth(this.authenticationService.currentUserValue.id).subscribe((response) => {
            this.health['order-api'] = 'UP';
        }, failure => {
            this.health['order-api'] = 'DOWN';
        })
    }

    getPaymentAPIHealth() {
        this.healthService.getPaymentHealth(this.authenticationService.currentUserValue.id).subscribe((response) => {
            this.health['payment-api'] = 'UP';
        }, failure => {
            this.health['payment-api'] = 'DOWN'
        })
    }
}