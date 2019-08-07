import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component'
import { ProductDetailsComponent } from './product/product-details.component'
import { OrderComponent } from './order/order.component'
import { OrderDetailsComponent } from './order/order-details.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [{
  path: '', component: ProductComponent, canActivate: [AuthGuard]
}, {
  path: 'product/:id', component: ProductDetailsComponent, canActivate: [AuthGuard]
}, { path: 'orders', component: OrderComponent, canActivate: [AuthGuard] }, { path: 'order/details/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] }, {
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
