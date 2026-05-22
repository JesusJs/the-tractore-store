import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  classicTractorImage = '/assets/AU-08-WH.webp';
  autonomousTractorImage = '/assets/AU-07-YE.webp';
}
