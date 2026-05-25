import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-variant-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './variant-option.component.html',
  styleUrl: './variant-option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantOptionComponent {
  options = input<string[]>([]);
  selected = model<string>('');
}
