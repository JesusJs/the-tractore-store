import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MiniCartItem {
  variantId: string;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
}

import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ds-mini-cart',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './mini-cart.component.html',
  styleUrl: './mini-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCartComponent {
  /** List of items in the cart */
  items = input<MiniCartItem[]>([]);
  /** Total price of the cart */
  total = input<number>(0);
  /** Number of items currently in the cart */
  itemCount = input<number>(0);
  /** Emits when the cart panel is toggled */
  cartToggle = output<void>();
  /** Emits when an item is removed from the cart */
  removeItem = output<string>();
  /** Emits when checkout is clicked */
  checkoutClick = output<void>();
  /** Emits when continue shopping is clicked */
  continueShoppingClick = output<void>();
}

