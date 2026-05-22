import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HomeComponent } from '../page/home/home.component';

@Component({
  imports: [RouterModule, HeaderComponent, FooterComponent, HomeComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent { 
  title = 'The Tractor Store';
}
