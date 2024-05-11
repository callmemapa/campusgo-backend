import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseModule } from 'src/firebase.module';

@Injectable()
export class ReservationService {
  constructor() {
    FirebaseModule.initializeApp();
  }

  async createReservation(
    id_passenger: string,
    id_route: string,
    payment_method: string,
    pick_up_point: string,
    reservation_status: string,
    fare: number,
    seats_to_reserve: number,
  ): Promise<object> {
    try {
      const passengerRef = admin
        .firestore()
        .collection('passengers')
        .doc(id_passenger);
      const routeRef = admin.firestore().collection('routes').doc(id_route);
      const reservationRef = await admin
        .firestore()
        .collection('reservations')
        .add({
          id_passenger: passengerRef,
          id_route: routeRef,
          payment_method,
          pick_up_point,
          reservation_status,
          fare,
          seats_to_reserve,
        });
      return {
        statusCode: 200,
        id_reservation: reservationRef.id,
        message: 'Reserva creada exitosamente.',
      };
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al crear la reserva',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
