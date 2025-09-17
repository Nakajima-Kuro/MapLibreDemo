import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FileService } from '../services/fileservice';

// import * as maplibregl from '@maptiler/sdk';
// import { Map } from '@maptiler/sdk';
// import '@maptiler/sdk/dist/maptiler-sdk.css';

import * as maplibregl from 'maplibre-gl';
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import proj4 from 'proj4';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-mapview',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule
  ],
  templateUrl: './mapview.html',
  styleUrl: './mapview.css',
  standalone: true,
})
export class Mapview implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  isLoading: boolean = true;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private fileService: FileService) {}

  ngOnInit(): void {}

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
    const initialState = { lng: 105.8, lat: 21, zoom: 9 };
    let layerUrl =
      'http://10.168.6.230:8082/geoserver/Anhvetinhmienphi/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&STYLES&LAYERS=Anhvetinhmienphi%3ALULC_HN2020&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&SRS=EPSG%3A32648&WIDTH=646&HEIGHT=769&BBOX=518579.12256423885%2C2260919.4607438515%2C617225.2100720416%2C2378195.3047159766';

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

    // Wait for the map to load then add png style layer over the map
    this.map.on('load', () => {
      this.isLoading = false;
      this.addImageLayerIfExists(layerUrl);
    });
  }

  addImageLayerIfExists(layerUrl: string) {
    try {
      const urlVariables = this.fileService.getUrlVariables(layerUrl);
      let bBox = urlVariables['BBOX']?.toString().split(',').map(Number);

      //convert from W2000 to WGS84 by proj4
      proj4.defs('EPSG:32648', '+proj=utm +zone=48 +datum=WGS84 +units=m +no_defs');
      for (let i = 0; i < bBox.length; i += 2) {
        let [lon, lat] = proj4('EPSG:32648', 'EPSG:4326', [bBox[i], bBox[i + 1]]);
        bBox[i] = lon;
        bBox[i + 1] = lat;
      }

      // Add image source and layer to the map
      this.map?.addSource('wms-source', {
        type: 'image',
        url: layerUrl, // Layer URL
        coordinates: [
          [bBox[0], bBox[3]], // Top-left
          [bBox[2], bBox[3]], // Top-right
          [bBox[2], bBox[1]], // Bottom-right
          [bBox[0], bBox[1]], // Bottom-left
        ],
      });

      this.map?.addLayer({
        id: 'wms-layer',
        type: 'raster',
        source: 'wms-source',
        paint: {
          'raster-opacity': 0.3, // Optional: adjust opacity
        },
      });
    } catch (error) {}
  }
}
