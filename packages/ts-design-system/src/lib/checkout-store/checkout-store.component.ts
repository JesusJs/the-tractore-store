import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-checkout-store',
  imports: [CommonModule],
  templateUrl: './checkout-store.component.html',
  styleUrl: './checkout-store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutStoreComponent {}
