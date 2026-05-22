import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, ],
  selector: 'app-mfe_decide-entry',
  templateUrl: 'entry.component.html',
  styleUrl: 'entry.component.scss'
})
export class RemoteEntryComponent {
  // onAddToCart(event: { id: string, variant: string }): void {
  //   console.log('Agregado al carrito:', event);
  //   alert(`¡Agregado al carrito! MFE-Decide ha emitido el producto: ${event.id} con la configuración: ${event.variant}`);
  // }
}
