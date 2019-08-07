import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order.component.less']
})

export class OrderDetailsComponent implements OnInit {
    public order = {};

    constructor(private orderService: OrderService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.orderService.getOrderByOrderId(parseInt(params['id'], 10)).subscribe((order) => this.order = order);
        })
    }

}
