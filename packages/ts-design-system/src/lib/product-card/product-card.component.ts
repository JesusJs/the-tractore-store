import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { VariantOptionComponent } from '../variant-option/variant-option.component';

@Component({
  selector: 'product-card',
  imports: [CommonModule, ButtonComponent, VariantOptionComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {

  id = input.required<string>();
  title = input.required<string>();
  brand = input<string>('Tractor Store');
  price = input.required<number>();
  image = input<string>('');
  variants = input<string[]>([]);
  description = input<string>('');

  // Signal de doble vía para sincronizar de inmediato la variante seleccionada
  selectedVariant = model<string>('');
  
  // Output moderno con el nuevo generador output() de Angular 17.1+
  addToCart = output<{ id: string, variant: string }>();

  onAddToCartClick(): void {
    const currentVariant = this.selectedVariant();
    if (currentVariant) {
      this.addToCart.emit({
        id: this.id(),
        variant: currentVariant
      });
    }
  }
}
