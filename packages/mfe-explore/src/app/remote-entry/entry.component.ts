import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductCardComponent } from '@the-tractor-store/ts-design-system';



@Component({
  selector: 'app-mfe_explore-entry',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: 'entry.component.html',
  styleUrl: './entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent {

}
