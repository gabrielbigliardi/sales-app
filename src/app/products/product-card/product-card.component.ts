import { Component, Input, inject, input } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CartItem } from '../../cart.dto';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../product.dto';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MaterialModule, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {
  @Input() product: Product
  cartService = inject(CartService)

  onAddToCart(product: Product) {
    const cartToAdd: CartItem = {
      idProduct: product.id,
      name: product.name,
      quantity: 1,
      unitPrice: product.unitPrice
    }
    this.cartService.addItem(cartToAdd)
  }
}
