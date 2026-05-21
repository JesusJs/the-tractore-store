import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '@the-tractor-store/ts-design-system';

@Component({
  imports: [CommonModule, ProductCardComponent],
  selector: 'app-mfe_decide-entry',
  template: `
    <product-card></product-card>
  `,
})
export class RemoteEntryComponent {}
