import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '@the-tractor-store/shared-catalog';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private cartService = inject(CartService);

  public navItems: NavItem[] = [
    { label: 'MACHINES', route: '/mfe_explore/machines' },
    { label: 'STORES',   route: '/mfe_explore/stores'  },
  ];

  public get cartCount(): number {
    return this.cartService.cartCount();
  }

  public toggleCart(): void {
    console.log('[Header] Cart toggled');
  }
}
