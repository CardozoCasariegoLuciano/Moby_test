import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Geo } from 'src/app/auth/interfaces/user.interface';

declare const google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [],
})
export class MapComponent implements OnInit {
  @Input() showMap!: boolean;
  @Output() oncloseModal: EventEmitter<boolean> = new EventEmitter();
  @Input() coords!: Geo;

  options: any;
  overlays: any[] = [];
  areValidCoords!: boolean;

  constructor() {}

  ngOnInit() {
    this.setMapCoords();
  }

  private setMapCoords() {
    if (this.coords.lat.length > 0 && this.coords.lng.length > 0) {
      this.areValidCoords = true;

      this.options = {
        center: { lat: Number(this.coords.lat), lng: Number(this.coords.lng) },
        zoom: 15,
        draggable: false,
        scrollwheel: false,
        zoomControl: false,
      };
      this.overlays = [
        new google.maps.Marker({
          position: {
            lat: Number(this.coords.lat),
            lng: Number(this.coords.lng),
          },
        }),
      ];
    } else {
      this.areValidCoords = false;
    }
  }

  closeModal() {
    this.oncloseModal.emit(true);
  }
}
