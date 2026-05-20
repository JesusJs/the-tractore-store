import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-mfe_checkout-entry',
  template: `
    <div class="p-6 bg-green-50 border border-green-200 rounded-xl shadow-sm m-4">
      <h2 class="text-xl font-bold text-green-800 flex items-center gap-2">
        <span>🛒</span> MFE Checkout
      </h2>
      <p class="text-green-600 mt-2">Este micro-frontend está usando clases de Tailwind CSS configuradas localmente.</p>
    </div>
  `,
})
export class RemoteEntryComponent {}
