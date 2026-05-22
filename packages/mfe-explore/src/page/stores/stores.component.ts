import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stores',
  imports: [CommonModule],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresComponent {}
