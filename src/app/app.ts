import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Mapview } from './mapview/mapview';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Mapview],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('maplibre_demo_nossr');
}
