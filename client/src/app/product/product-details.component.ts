import { Component, OnInit } from '@angular/core'
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../services/order.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product.component.less']
})
export class ProductDetailsComponent implements OnInit {
    public product = {};
    public error;
    public showToast = false;

    constructor(private productService: ProductService, private route: ActivatedRoute, private modalService: NgbModal, private orderService: OrderService) { }

    ngOnInit() {
        this.fetchProduct();
    }

    fetchProduct() {
        this.route.params.subscribe((params) => {
            this.productService.getProductById(parseInt(params['id'], 10)).subscribe((product) => this.product = product);
        })
    }

    open(content) {
        this.modalService.open(content);

        return false;
    }

    close() {
        this.modalService.dismissAll();
        this.error = '';
    }

    proceedToBuy(data) {
        if (data && data.pin === '') {
            this.error = 'Pin is required to proceed.'
            return;
        }

        if (this.error) {
            this.error = '';
        }

        this.orderService.placeNewOrder({
            productId: this.product['id'],
            userId: 1,
            authPin: parseInt(data.pin, 10) === NaN ? data.pin : parseInt(data.pin, 10)
        }).subscribe(data => {
            this.close();
            this.fetchProduct();
            this.showToast = true;        
        }, failure => {
            console.log('Error', failure);
            if (failure.status === 400) {
                this.error = failure.error.error.message;
            } else {
                this.error = 'Something went wrong while processing your request!';
            }
        })
    }
}