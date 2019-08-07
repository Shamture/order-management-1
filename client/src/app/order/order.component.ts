import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthenticationService } from '../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  orders:any = [];
  cancelOrderId: number = 0;
  currentUser: User
  
  constructor(private orderService: OrderService, private modalService: NgbModal, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x
      
      this.getAllOrders();
    });
  }

  
  getAllOrders() {
    this.orderService.getOrdersByUserId(this.currentUser.id).subscribe((orders: any[]) => {
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

  showOrderDetails(event, orderId: number) {
    this.router.navigate(['/order/details', orderId]);
  }

  open(event, content, orderId: number) {
    this.cancelOrderId = orderId;
    this.modalService.open(content);

    return false;
  }

  close() {
    this.modalService.dismissAll();
  }
}
