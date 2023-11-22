import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public constructor(private readonly mapService: MapService) {
  }

  public ngOnInit(): void {
    this.mapService.initialize();
  }
}
