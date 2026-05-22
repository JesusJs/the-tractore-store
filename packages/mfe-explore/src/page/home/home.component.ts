import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  // Imágenes para los productos
    classicTractorImage = "https://images.unsplash.com/photo-1564121319696-13b543ef4df4?w=600&auto=format&fit=crop";
    autonomousTractorImage = "https://images.unsplash.com/photo-1581094240067-3bb9b63d78a3?w=600&auto=format&fit=crop";
}
