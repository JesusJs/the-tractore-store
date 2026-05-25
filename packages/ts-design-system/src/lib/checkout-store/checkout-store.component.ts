import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StoreListItem {
  id: string;
  name: string;
  address: string;
  city: string;
}

@Component({
  selector: 'ds-checkout-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-store.component.html',
  styleUrl: './checkout-store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutStoreComponent {
  stores = input<StoreListItem[]>([]);
  select = output<string>();
  close = output<void>();
}

