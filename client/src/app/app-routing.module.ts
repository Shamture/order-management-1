import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component'
import { ProductDetailsComponent } from './product/product-details.component'
import { OrderComponent } from './order/order.component'


const routes: Routes = [{
  path: 'products', component: ProductComponent
}, {
  path: 'product/:id', component: ProductDetailsComponent
}, { path: 'orders', component: OrderComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
