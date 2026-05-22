import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produc-detail',
  imports: [CommonModule],
  templateUrl: './produc-detail.component.html',
  styleUrl: './produc-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProducDetailComponent {
  productId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Escuchamos los cambios en la ruta para obtener el :id
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      console.log('Cargando datos para el producto:', this.productId);
      // Aquí llamarías a tu servicio para obtener los datos del tractor
    });
  }
}
