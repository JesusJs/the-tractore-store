import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public navItems: NavItem[] = [
    { label: 'MACHINES', route: '/mfe_explore/machines' },
    { label: 'STORES',   route: '/mfe_explore/stores'  },
  ];

  public cartCount: number = 0;

  public toggleCart(): void {
    console.log('[Header] Cart toggled');
  }
}
