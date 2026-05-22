import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-mini-cart',
  imports: [CommonModule],
  templateUrl: './mini-cart.component.html',
  styleUrl: './mini-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCartComponent {
  /** Number of items currently in the cart */
  itemCount = input<number>(0);
  /** Emits when the cart panel is toggled */
  cartToggle = output<void>();
}
