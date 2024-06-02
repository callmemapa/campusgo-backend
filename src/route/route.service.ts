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

  async updateRoute(
    id_route: string,
    id_driver?: string,
    date?: Date,
    origin?: string,
    destination?: string,
    latitude_origin?: number,
    longitude_origin?: number,
    latitude_destination?: number,
    longitude_destination?: number,
    distance?: string,
    estimate_time?: string,
    price?: number,
    seating_capacity?: number,
    waypoints?: Array<string>,
    isComplete?: boolean,
  ): Promise<object> {
    try {
      const routeRef = admin.firestore().collection('routes').doc(id_route);

      const snapshot = await routeRef.get();
      if (!snapshot.exists) {
        throw new HttpException(
          'La ruta no fue encontrada',
          HttpStatus.NOT_FOUND,
        );
      }
  
      const updateData: any = {};
      if (id_driver) {
        const driverRef = admin.firestore().collection('drivers').doc(id_driver);
        updateData.id_driver = driverRef;
      }
      if (date) updateData.date = date;
      if (origin) updateData.origin = origin;
      if (destination) updateData.destination = destination;
      if (latitude_origin !== undefined) updateData.latitude_origin = latitude_origin;
      if (longitude_origin !== undefined) updateData.longitude_origin = longitude_origin;
      if (latitude_destination !== undefined) updateData.latitude_destination = latitude_destination;
      if (longitude_destination !== undefined) updateData.longitude_destination = longitude_destination;
      if (distance) updateData.distance = distance;
      if (estimate_time) updateData.estimate_time = estimate_time;
      if (price !== undefined) updateData.price = price;
      if (seating_capacity !== undefined) updateData.seating_capacity = seating_capacity;
      if (waypoints) updateData.waypoints = waypoints;
      if (isComplete !== undefined) updateData.isComplete = isComplete;
  
      await routeRef.update(updateData);
  
      return {
        statusCode: 200,
        message: 'Ruta actualizada exitosamente.',
        data: routeRef.id
      };
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al actualizar la ruta',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllRoutes(): Promise<object> {
    try {
      const routesRef = admin.firestore().collection('routes');
      const snapshot = await routesRef.get();
  
      if (snapshot.empty) {
        throw new HttpException(
          'No se encontraron rutas',
          HttpStatus.NOT_FOUND,
        );
      }
  
      const routes: Array<object> = [];
      snapshot.forEach(doc => {
        routes.push({
          id: doc.id,
          data: doc.data(),
        });
      });
  
      return {
        statusCode: 200,
        message: 'Rutas recuperadas exitosamente.',
        data: routes,
      };
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer las rutas',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }
}
