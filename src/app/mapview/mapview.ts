import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, MapStyle, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

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
    config.apiKey = 'TklZTc88Zw2IBk5gacCp';
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
      style: MapStyle.SATELLITE,
      center: [initialState.lng, initialState.lat], // starting position [lng, lat]
      zoom: initialState.zoom, // starting zoom
    });
  }
}
