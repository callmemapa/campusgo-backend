import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseModule } from 'src/firebase.module';

@Injectable()
export class RouteService {
  constructor() {
    FirebaseModule.initializeApp();
  }

  async createRoute(
    id_driver: string,
    date: Date,
    origin: string,
    destination: string,
    latitude_origin: number,
    longitude_origin: number,
    latitude_destination: number,
    longitude_destination: number,
    distance: string,
    estimate_time: string,
    price: number,
    seating_capacity: number,
    waypoints: Array<string>,
    isComplete: boolean,
  ): Promise<object> {
    try {
      const driverRef = admin.firestore().collection('drivers').doc(id_driver);
      const routeRef = await admin.firestore().collection('routes').add({
        id_driver: driverRef,
        date,
        origin,
        destination,
        latitude_origin,
        longitude_origin,
        latitude_destination,
        longitude_destination,
        distance,
        estimate_time,
        price,
        seating_capacity,
        waypoints,
        isComplete
      });
      return {
        statusCode: 200,
        id_route: routeRef.id,
        message: 'Ruta creada exitosamente.',
      };
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al crear la ruta',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async readRoute(id_route: string): Promise<object> {
    try {
      const docRef = admin.firestore().collection('routes').doc(id_route);
      const snapshot = await docRef.get();

      if (snapshot.exists) {
        return {
          id: snapshot.id,
          data: snapshot.data(),
        };
      } else {
        throw new HttpException(
          'La ruta no fue encontrada',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer la ruta',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }
}
