import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produc-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produc-detail.component.html',
  styleUrl: './produc-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProducDetailComponent {
  productId: string | null = null;

  constructor(private route: ActivatedRoute) { }

}
