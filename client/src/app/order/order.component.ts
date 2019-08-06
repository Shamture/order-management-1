import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './order.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit, OnDestroy {
  orders = [];
  dtOptions: DataTables.Settings = {};

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.orderService.getOrdersByUserId(1).subscribe((orders: any[]) => {
      this.orders = orders;
    })

  }

  ngOnDestroy(): void {
        
  }
}
