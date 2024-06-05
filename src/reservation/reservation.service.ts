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

  async readReservation(id_reservation: string): Promise<object> {
    try {
      const docRef = admin
        .firestore()
        .collection('reservations')
        .doc(id_reservation);
      const snapshot = await docRef.get();

      if (snapshot.exists) {
        return {
          id: snapshot.id,
          data: snapshot.data(),
        };
      } else {
        throw new HttpException(
          'La reserva no fue encontrada',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer la reserva',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  async getAllReservations(): Promise<object> {
    try {
      const reservationsRef = admin.firestore().collection('reservations');
      const snapshot = await reservationsRef.get();

      if (snapshot.empty) {
        return {
          statusCode: 200,
          message: 'No se encontraron reservas.',
          data: [],
        };
      }

      const reservations = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      return {
        statusCode: 200,
        message: 'Reservas recuperadas exitosamente.',
        data: reservations,
      };
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer las reservas',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  async updateReservation(
    id_reservation: string,
    id_passenger?: string,
    id_route?: string,
    payment_method?: string,
    pick_up_point?: string,
    reservation_status?: string,
    fare?: number,
    seats_to_reserve?: number,
  ): Promise<object> {
    try {
      const reservationRef = admin
        .firestore()
        .collection('reservations')
        .doc(id_reservation);

      const snapshot = await reservationRef.get();
      if (!snapshot.exists) {
        throw new HttpException(
          'La reserva no fue encontrada',
          HttpStatus.NOT_FOUND,
        );
      }

      const updateData: any = {};
      if (id_passenger) {
        const passengerRef = admin
          .firestore()
          .collection('passengers')
          .doc(id_passenger);
        updateData.id_passenger = passengerRef;
      }
      if (id_route) {
        const routeRef = admin.firestore().collection('routes').doc(id_route);
        updateData.id_route = routeRef;
      }
      if (payment_method) updateData.payment_method = payment_method;
      if (pick_up_point) updateData.pick_up_point = pick_up_point;
      if (reservation_status)
        updateData.reservation_status = reservation_status;
      if (fare !== undefined) updateData.fare = fare;
      if (seats_to_reserve !== undefined)
        updateData.seats_to_reserve = seats_to_reserve;

      await reservationRef.update(updateData);

      return {
        statusCode: 200,
        message: 'Reserva actualizada exitosamente.',
        data: updateData,
      };
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al actualizar la reserva',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
