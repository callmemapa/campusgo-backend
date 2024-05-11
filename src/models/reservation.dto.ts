export interface ReservationDto {
  id_passenger: string;
  id_route: string;
  payment_method: string;
  pick_up_point: string;
  reservation_status: string;
  fare: number;
  seats_to_reserve: number;
}
