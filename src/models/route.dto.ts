export interface RouteDto {
  id_driver: string;
  date: Date;
  origin: string;
  destination: string;
  latitude_origin: number;
  longitude_origin: number;
  latitude_destination: number;
  longitude_destination: number;
  distance: string;
  estimate_time: string;
  price: number;
  seating_capacity: number;
  waypoints: Array<string>;
}
