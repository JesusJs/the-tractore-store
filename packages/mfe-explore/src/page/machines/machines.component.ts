import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-machines',
  imports: [CommonModule, RouterLink],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MachinesComponent {}
