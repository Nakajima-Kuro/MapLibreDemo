import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
// import * as maplibregl from '@maptiler/sdk';
// import { Map } from '@maptiler/sdk';
// import '@maptiler/sdk/dist/maptiler-sdk.css';

import * as maplibregl from 'maplibre-gl';
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-mapview',
  imports: [],
  templateUrl: './mapview.html',
  styleUrl: './mapview.css',
})
export class Mapview implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor() {}

  ngOnInit(): void {
    // config.apiKey = 'TklZTc88Zw2IBk5gacCp';
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  initMap(): void {
    // Initialize the map here using MapLibre GL JS
    const initialState = { lng: 106, lat: 16, zoom: 5 };
    this.map = new Map({
      container: this.mapContainer.nativeElement, // container ID
      style:
        'https://api.maptiler.com/maps/satellite/style.json?key=I9wWU1dnlxq4iLDF2WfM&mtsid=ab4bc823-7da3-4a25-95ad-57c780bed5da',
      center: [initialState.lng, initialState.lat], // starting position [lng, lat]
      zoom: initialState.zoom, // starting zoom,
    });

    // Add scale control to the map.
    let scale = new maplibregl.ScaleControl({
      maxWidth: 80,
      unit: 'metric',
    });
    this.map.addControl(scale, 'bottom-right');

    // Add zoom and rotation controls to the map.
    this.map.addControl(
      new maplibregl.NavigationControl({
        visualizePitch: true,
        visualizeRoll: true,
        showZoom: true,
        showCompass: true,
      })
    );

    this.map.on('load', () => {
      console.log('Map has been loaded');
    });
  }
}
