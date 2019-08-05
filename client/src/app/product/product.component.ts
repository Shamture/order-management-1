import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  public products = [];

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = Array.from(Object.keys(data), k => data[k]);
    })
  }

}
