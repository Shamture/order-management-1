import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  orders = [];
  dtOptions: DataTables.Settings = {};
  cancelOrderId: number = 0;

  constructor(private orderService: OrderService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      "order": [[4, "desc"]]
    };
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getOrdersByUserId(1).subscribe((orders: any[]) => {
      this.orders = orders;
    })
  }

  cancelOrder() {
    this.orderService.cancelOrder(this.cancelOrderId).subscribe(data => {
      this.cancelOrderId = 0;
      this.close();
      this.getAllOrders();
    }, failure => {
      console.log('Error', failure);
    });

  }

  showOrderDetails(orderId: number) {
    this.router.navigate(['/order/details', orderId]);
  }

  open(content, orderId: number) {
    this.cancelOrderId = orderId;
    this.modalService.open(content);

    return false;
  }

  close() {
    this.modalService.dismissAll();
  }
}
