import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RecommendationsComponent } from '../components/recommendations/recommendations.component';

@Component({
  imports: [RouterModule, HeaderComponent, FooterComponent, RecommendationsComponent],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'The Tractor Store';
}
