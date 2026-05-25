import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RecomendationsComponent } from '../../page/recomendations/recomendations.component';
import { HomeComponent } from '../../page/home/home.component';
import { FooterComponent } from '../../components/footer/footer.component';





@Component({
  selector: 'app-mfe_explore-entry',
  standalone: true,
  imports: [CommonModule, RecomendationsComponent,
     HomeComponent, FooterComponent],
  templateUrl: 'entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent {

}
