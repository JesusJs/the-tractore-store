import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-mfe_explore-entry',
  template: `
   <h1> Hola mundo</h1>
  `,
  styles: [`
   h1 {
    color: var(--brand-accent);
   }
  `]
})
export class RemoteEntryComponent { }
