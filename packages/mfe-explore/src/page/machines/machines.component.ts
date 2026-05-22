import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-machines',
  imports: [CommonModule],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MachinesComponent {}
