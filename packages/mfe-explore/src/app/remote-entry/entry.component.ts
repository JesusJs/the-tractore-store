import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
export interface Tractor {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  variants: string[];
  description: string;
  category: 'classic' | 'autonomous';
}
@Component({
  imports: [CommonModule],
  selector: 'app-mfe_explore-entry',
  templateUrl: 'entry.component.html',
  styleUrl: './entry.component.scss',
})
export class RemoteEntryComponent {

}
