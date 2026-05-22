import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '@the-tractor-store/ts-design-system';

@Component({
  imports: [CommonModule, ProductCardComponent],
  selector: 'app-mfe_decide-entry',
  template: `
    <div class="max-w-sm mx-auto p-4">
      <ds-product-card
        id="tractor-super-x"
        title="Tractor John Deere Super X"
        brand="John Deere"
        [price]="145000"
        image="https://images.unsplash.com/photo-1594142404563-64ccc95acb0f?q=80&w=600&auto=format&fit=crop"
        [variants]="['Ruedas Standard', 'Orugas Premium', 'Motor TwinTurbo 500hp']"
        description="El tractor John Deere Super X está diseñado para la máxima productividad y eficiencia en terrenos difíciles. Equipado con tecnologías de punta y tracción inteligente adaptable."
        (addToCart)="onAddToCart($event)">
      </ds-product-card>
    </div>
  `,
})
export class RemoteEntryComponent {
  onAddToCart(event: { id: string, variant: string }): void {
    console.log('Agregado al carrito:', event);
    alert(`¡Agregado al carrito! MFE-Decide ha emitido el producto: ${event.id} con la configuración: ${event.variant}`);
  }
}
