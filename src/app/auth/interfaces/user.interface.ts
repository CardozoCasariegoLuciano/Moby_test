export interface User {
  id?: string;
  fullName: string;
  userName: string;
  email: string;
  role: string;
  photo: string;
  birthDate: string;
  ubication: Geo;
}

export interface EditUser {
  ubication: Geo;
  photo: string;
  userName: string;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface ShortUser {
  id?: string;
  userName: string;
  photo: string;
}
