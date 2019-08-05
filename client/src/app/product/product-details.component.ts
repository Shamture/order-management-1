import { Component, OnInit } from '@angular/core'
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product.component.less']
})
export class ProductDetailsComponent implements OnInit {
    public product = {};

    constructor(private productService: ProductService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.productService.getProductById(parseInt(params['id'], 10)).subscribe((product) => this.product = product);
        })
    }

}