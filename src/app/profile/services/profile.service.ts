import { Injectable } from '@angular/core';
import { Geo } from 'src/app/auth/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userLocation!: Geo;

  constructor() {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<Geo> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (args) => {
          this.userLocation = {
            lng: args.coords.longitude.toString(),
            lat: args.coords.latitude.toString(),
          };
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se puedo acceder a la geolocation');
          console.log('No se puedo acceder a la geolocation', err);
          reject();
        }
      );
    });
  }
}
