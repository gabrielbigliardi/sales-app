import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../material.module';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './product.service';
import { Product } from './product.dto';
import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent implements OnInit {
  productsService = inject(ProductService)
  productsObservable: Observable<Product[]>

  async ngOnInit() {
    this.productsObservable = this.productsService.getAll()
    // console.log(this.productsObservable);

  }
}
