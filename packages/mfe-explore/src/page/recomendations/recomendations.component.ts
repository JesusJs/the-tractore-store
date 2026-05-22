import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recomendations',
  imports: [CommonModule],
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecomendationsComponent {}
