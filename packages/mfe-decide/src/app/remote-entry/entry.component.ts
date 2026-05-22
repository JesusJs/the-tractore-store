import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@the-tractor-store/shared-catalog';

@Component({
  imports: [CommonModule],
  selector: 'app-mfe_decide-entry',
  templateUrl: 'entry.component.html',
  styleUrl: 'entry.component.scss'
})
export class RemoteEntryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);

  public productName = signal<string>('Sapphire Sunworker 460R');
  public productPrice = signal<string>('8700 Ø');
  public productImage = signal<string>('placeholder_tractor_detail.jpg');
  public productDescription = signal<string>(
    'Next-generation autonomous guidance system for seamless operation. High-capacity energy storage for all-day work without recharge. Advanced analytics suite for precision soil and plant health management.'
  );

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['name']) {
        this.productName.set(params['name']);
      }
      if (params['price']) {
        this.productPrice.set(params['price']);
      }
      if (params['image']) {
        this.productImage.set(params['image']);
      }
      if (params['description']) {
        this.productDescription.set(params['description']);
      } else if (params['name']) {
        this.productDescription.set(`High-quality ${params['name']} designed for heavy duty performance and reliability.`);
      }
    });
  }

  public addToCart(): void {
    this.cartService.addToCart({
      name: this.productName(),
      price: this.productPrice(),
      image: this.productImage()
    });
    alert(`¡Agregado al carrito! ${this.productName()}`);
  }
}
