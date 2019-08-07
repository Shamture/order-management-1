import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment'

import { JwtInterceptor } from './helpers/jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product/product-details.component';
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';
import { HealthService } from './services/health.service';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component'
import { OrderDetailsComponent } from './order/order-details.component';
import { LoginComponent } from './login/login.component';
import { HealthComponent } from './health/health.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductDetailsComponent,
    OrderComponent,
    PaymentComponent,
    OrderDetailsComponent,
    LoginComponent,
    HealthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule
  ],
  providers: [ProductService, OrderService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, HealthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
