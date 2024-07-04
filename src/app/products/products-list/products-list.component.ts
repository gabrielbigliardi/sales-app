import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../product.dto';
import { Observable, lastValueFrom } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { LoadingBarComponent } from '../../loading-bar.component';
import { CartService } from '../../cart.service';
import { CartItem } from '../../cart.dto';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [AsyncPipe, MaterialModule, CurrencyPipe, LoadingBarComponent, ProductCardComponent],
  templateUrl: './products-list.component.html',
  styles: ``
})
export class ProductsListComponent implements OnInit {

  productService = inject(ProductService)
  products: Product[]
  productsObservable: Observable<Product[]>
  fb = inject(FormBuilder)
  searchForm: FormGroup
  cartService = inject(CartService)

  async ngOnInit() {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    })
    this.getProducts()
    console.log(this.searchForm);

  }

  private async getProducts(searchTerm?: string) {
    this.productsObservable = this.productService.getAll(searchTerm)
    // this.productsObservable = this.productService.getAll()
    this.products = await lastValueFrom(this.productsObservable)
    // console.log('produtos: ' + this.products);
    // console.log('productsObservable: ' + this.productsObservable);

  }

  onSearch() {
    this.getProducts(this.searchForm.value.searchTerm)
    // console.log(this.searchForm.value);
  }



}
