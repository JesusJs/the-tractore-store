import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    // readonly products = [
    // { id: 'tx-001', name: 'Sapphire Sunworker 460R', price: 7500.00, image: 'https://images.unsplash.com/photo-1581091225813-07b6b363a42e?w=600' },
    // { id: 'tx-002', name: 'Field Pioneer', price: 4500.00, image: 'https://images.unsplash.com/photo-1556030168-ff43cfb60941?w=600' },
    // { id: 'tx-003', name: 'SmartFarm Titan', price: 4000.00, image: 'https://images.unsplash.com/photo-1564763595004-721096e713f0?w=600' }
  // ];
}
