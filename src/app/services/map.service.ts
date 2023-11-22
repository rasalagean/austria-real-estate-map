import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import districtsAustriaGeoJson from '../../assets/districts-austria.json';
import { FeatureCollection } from 'geojson';
import districtsAustriaPricesJson from '../../assets/districts-austria-prices.json';
import { DistrictAustriaPriceType } from '../types/district-austria-price.type';
import { MapboxOptions } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private readonly mapboxOptions: MapboxOptions = {
    accessToken: environment.mapbox.accessToken,
    container: 'map',
    style: environment.mapbox.style,
    zoom: 7,
    center: [13.30, 47.80],
  };
  private readonly districtDataSourceId = 'district-austria-source';
  private readonly districtNamesLayerId = 'district-names';
  private readonly districtFillLayerId = 'district-austria-fill';
  private readonly districtOutlineLayerId = 'district-austria-outline';
  private readonly constructionLandPricePropertyName = 'constructionLandPrice';

  private map: mapboxgl.Map | undefined;

  public initialize(): void {
    this.map = new mapboxgl.Map(this.mapboxOptions);
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.addDistrictDataSource();
      this.addDistrictVisualization();
      this.addDistrictClickHandlers();
    });
  }

  private addDistrictDataSource(): void {
    const districtsAustriaPrices = districtsAustriaPricesJson as DistrictAustriaPriceType[];

    districtsAustriaGeoJson.features.forEach(feature => {
      // @ts-ignore
      feature.properties[this.constructionLandPricePropertyName] = districtsAustriaPrices.find(
          value => value.iso === +feature.properties.iso
      )?.constructionLandPrice;
    });

    this.map?.addSource(this.districtDataSourceId, {
      type: "geojson",
      data: districtsAustriaGeoJson as FeatureCollection
    });
  }

  private addDistrictVisualization(): void {
    this.map?.addLayer({
      id: this.districtNamesLayerId,
      type: 'symbol',
      source: this.districtDataSourceId,
      layout: {
        'text-field': ['get', 'name'],
        'text-variable-anchor': ['bottom']
      }
    });

    this.map?.addLayer({
      id: this.districtOutlineLayerId,
      type: 'line',
      source: this.districtDataSourceId,
      paint: {
        'line-color': 'rgba(0, 0, 0, 0.5)',
        'line-width': 1
      }
    });

    this.map?.addLayer({
          id: this.districtFillLayerId,
          type: 'fill',
          source: this.districtDataSourceId,
          paint: {
            "fill-color": [
              'interpolate',
              ['linear'],
              ['get', this.constructionLandPricePropertyName],
              0,
              '#e5ffff',
              200,
              '#099fab',
              400,
              '#21b7a4',
              600,
              '#0d9777',
              800,
              '#036248',
              1000,
              '#076b33',
              1200,
              '#034f28',
              1400,
              '#003c17',
              1600,
              '#002f14'
            ],
            'fill-opacity': 0.6
          }
        },
        this.districtNamesLayerId);
  }

  private addDistrictClickHandlers(): void {
    this.map?.on('click', this.districtFillLayerId, (e) => {
      if (this.map instanceof mapboxgl.Map) {
        const selectedDistrict = (e?.features?.find(
            feature => (feature?.properties as DistrictAustriaPriceType).constructionLandPrice,
        )?.properties) as DistrictAustriaPriceType;

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(selectedDistrict.name + ": " + selectedDistrict.constructionLandPrice + " €/m²" ?? 'No data')
            .addTo(this.map);
      }
    });

    this.map?.on('mouseenter', this.districtFillLayerId, () => {
      if (this.map instanceof mapboxgl.Map) {
        this.map.getCanvas().style.cursor = 'pointer';
      }
    });

    this.map?.on('mouseleave', this.districtFillLayerId, () => {
      if (this.map instanceof mapboxgl.Map) {
        this.map.getCanvas().style.cursor = '';
      }
    });
  }
}
