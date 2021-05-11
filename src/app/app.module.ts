import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './component/common/header/header.component';
import {FooterComponent} from './component/common/footer/footer.component';
import {ProductListComponent} from './component/products/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {RouterModule, Routes} from '@angular/router';
import {ProductCategoryComponent} from './component/product-category/product-category.component';
import {SearchComponent} from './component/search/search.component';
import {ProductDetailsComponent} from './component/product-details/product-details.component';
import {NgModule} from '@angular/core';
import { CartStatusComponent } from './component/cart/cart-status/cart-status.component';
import { CartDetailsComponent } from './component/cart/cart-details/cart-details.component';
import { CheckoutComponent } from './component/cart/checkout/checkout.component';
import {ReactiveFormsModule} from '@angular/forms';

//TODO define routes
const routes: Routes = [
  {path: 'checkout', component: CheckoutComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo:'/products',pathMatch:'full'},
  {path: '**', redirectTo:'/products',pathMatch:'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    ProductCategoryComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
