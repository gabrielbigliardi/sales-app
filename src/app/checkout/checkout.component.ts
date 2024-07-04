import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart.dto';
import { MaterialModule } from '../material.module';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MaterialModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styles: ``
})
export class CheckoutComponent {
  cartService = inject(CartService)
  items: CartItem[] = []

  ngOnInit() {
    this.items = this.cartService.getItems()
  }

  onRemoveItem(item: CartItem) {

  }
}
