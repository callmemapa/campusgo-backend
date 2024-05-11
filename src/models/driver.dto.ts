import { ReviewDto } from './review.dto';

export interface DriverDto {
  uid: string;
  id_vehicle: string;
  reviews: Array<ReviewDto>;
  trips_completed: number;
}
