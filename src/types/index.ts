export interface SportPhoto {
  id: number;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  year: number;
  description: string;
  photographer: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}