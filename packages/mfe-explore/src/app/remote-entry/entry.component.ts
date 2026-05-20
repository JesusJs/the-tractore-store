import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-mfe_explore-entry',
  template: `
    <div class="p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-sm m-4">
      <h2 class="text-xl font-bold text-blue-800 flex items-center gap-2">
        <span>🔍</span> MFE Explore
      </h2>
      <p class="text-blue-600 mt-2">Este micro-frontend está usando clases de Tailwind CSS configuradas localmente.</p>
    </div>
  `,
})
export class RemoteEntryComponent {}
