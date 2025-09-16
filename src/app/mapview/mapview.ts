import { Component, AfterViewInit } from '@angular/core';
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-mapview',
  imports: [],
  templateUrl: './mapview.html',
  styleUrl: './mapview.css',
})
export class Mapview implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 0);
  }

  initMap(): void {
    // Initialize the map here using MapLibre GL JS
    const initialState = { lng: 105, lat: 16, zoom: 5 };
    const map = new Map({
      container: 'map', // container ID
      style: `https://api.maptiler.com/maps/basic-v2/style.json?key=I9wWU1dnlxq4iLDF2WfM&mtsid=ab4bc823-7da3-4a25-95ad-57c780bed5da`,
      center: [70, 0], // starting position [lng, lat]
      zoom: 2, // starting zoom
    });
  }
}
