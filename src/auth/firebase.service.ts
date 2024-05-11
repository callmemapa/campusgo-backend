import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ReviewDto } from 'src/models/review.dto';
import { FirebaseModule } from 'src/firebase.module';

@Injectable()
export class FirebaseService {
  private firebaseAuth: admin.auth.Auth;

  constructor() {
    FirebaseModule.initializeApp();
    this.firebaseAuth = admin.auth();
  }

  async createUser(
    document_type: string,
    document_number: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone_number: string,
    address: string,
    url_profile_photo: string,
  ): Promise<object> {
    try {
      const userRecord = await this.firebaseAuth.createUser({
        email,
        password,
      });
      await admin.firestore().collection('users').doc(userRecord.uid).set({
        document_type,
        document_number,
        first_name,
        last_name,
        email,
        phone_number,
        address,
        url_profile_photo,
      });
      return {
        statusCode: 200,
        uid: userRecord.uid,
        message: 'Usuario creado exitosamente.',
      };
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        throw new HttpException(
          'La dirección de correo electrónico ya está en uso por otra cuenta.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Error al crear el usuario.',
          HttpStatus.FORBIDDEN,
        );
      }
    }
  }

  async createDriver(
    uid: string,
    id_vehicle: string,
    reviews: Array<ReviewDto>,
    trips_completed: number,
  ): Promise<object> {
    try {
      const vehicleRef = admin
        .firestore()
        .collection('vehicles')
        .doc(id_vehicle);
      const driverRef = await admin.firestore().collection('drivers').add({
        id_vehicle: vehicleRef,
        reviews,
        trips_completed,
      });
      await admin.firestore().collection('users').doc(uid).set(
        {
          id_driver: driverRef,
          isDriver: true,
        },
        { merge: true },
      );
      return {
        statusCode: 200,
        id_driver: driverRef.id,
        message: 'Conductor creado exitosamente.',
      };
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al crear el conductor',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createPassenger(uid: string, number_of_trips: number): Promise<object> {
    try {
      const passengerRef = await admin
        .firestore()
        .collection('passengers')
        .add({
          number_of_trips,
        });
      await admin.firestore().collection('users').doc(uid).set(
        {
          id_passenger: passengerRef,
          isPassenger: true,
        },
        { merge: true },
      );
      return {
        statusCode: 200,
        id_passenger: passengerRef.id,
        message: 'Pasajero creado exitosamente.',
      };
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al crear el pasajero',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
