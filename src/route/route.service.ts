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
}
