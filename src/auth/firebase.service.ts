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
    reviews: Array<ReviewDto>,
    trips_completed: number,
  ): Promise<object> {
    try {
      const driverRef = await admin.firestore().collection('drivers').add({
        id_vehicle: '',
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

  async readUser(uid: string): Promise<object> {
    try {
      const docRef = admin.firestore().collection('users').doc(uid);
      const snapshot = await docRef.get();

      if (snapshot.exists) {
        return {
          id: snapshot.id,
          data: snapshot.data(),
        };
      } else {
        throw new HttpException(
          'El usuario no fue encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer al usuario',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  async getAllUsers(): Promise<object> {
    try {
      const snapshot = await admin.firestore().collection('users').get();
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }));
  
      return {
        statusCode: 200,
        message: 'Usuarios recuperados exitosamente.',
        data: users,
      };
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer los usuarios',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  async readDriver(id_driver: string): Promise<object> {
    try {
      const docRef = admin.firestore().collection('drivers').doc(id_driver);
      const snapshot = await docRef.get();

      if (snapshot.exists) {
        return {
          id: snapshot.id,
          data: snapshot.data(),
        };
      } else {
        throw new HttpException(
          'El conductor no fue encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer al conductor',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  async getAllDrivers(): Promise<object> {
    try {
      const snapshot = await admin.firestore().collection('drivers').get();
      const drivers = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }));
  
      return {
        statusCode: 200,
        message: 'Conductores recuperados exitosamente.',
        data: drivers,
      };
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer los conductores',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }
  
  async readPassenger(id_passenger: string): Promise<object> {
    try {
      const docRef = admin
        .firestore()
        .collection('passengers')
        .doc(id_passenger);
      const snapshot = await docRef.get();

      if (snapshot.exists) {
        return {
          id: snapshot.id,
          data: snapshot.data(),
        };
      } else {
        throw new HttpException(
          'El pasajero no fue encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer al pasajero',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  async getAllPassengers(): Promise<object> {
    try {
      const snapshot = await admin.firestore().collection('passengers').get();
      const passengers = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }));
  
      return {
        statusCode: 200,
        message: 'Pasajeros recuperados exitosamente.',
        data: passengers,
      };
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer los pasajeros',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }
  
  async updateUser(
    uid: string,
    document_type?: string,
    document_number?: number,
    first_name?: string,
    last_name?: string,
    email?: string,
    phone_number?: string,
    address?: string,
    url_profile_photo?: string,
  ): Promise<object> {
    try {
      const userRef = admin.firestore().collection('users').doc(uid);
  
      const snapshot = await userRef.get();
      if (!snapshot.exists) {
        throw new HttpException(
          'El usuario no fue encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      const updateData: any = {};
      if (document_type) updateData.document_type = document_type;
      if (document_number) updateData.document_number = document_number;
      if (first_name) updateData.first_name = first_name;
      if (last_name) updateData.last_name = last_name;
      if (email) updateData.email = email;
      if (phone_number) updateData.phone_number = phone_number;
      if (address) updateData.address = address;
      if (url_profile_photo) updateData.url_profile_photo = url_profile_photo;
  
      await userRef.update(updateData);
  
      return {
        statusCode: 200,
        message: 'Usuario actualizado exitosamente.',
        data: updateData,
      };
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al actualizar el usuario',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateDriver(
    id_driver: string,
    reviews?: Array<ReviewDto>,
    trips_completed?: number,
    id_vehicle?: string,
  ): Promise<object> {
    try {
      const driverRef = admin.firestore().collection('drivers').doc(id_driver);
  
      const snapshot = await driverRef.get();
      if (!snapshot.exists) {
        throw new HttpException(
          'El conductor no fue encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
  
      const updateData: any = {};
      if (reviews) updateData.reviews = reviews;
      if (trips_completed) updateData.trips_completed = trips_completed;
      if (id_vehicle) updateData.id_vehicle = id_vehicle;
  
      await driverRef.update(updateData);
  
      return {
        statusCode: 200,
        message: 'Conductor actualizado exitosamente.',
        data: updateData
      };
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al actualizar el conductor',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updatePassenger(
    id_passenger: string,
    number_of_trips?: number,
  ): Promise<object> {
    try {
      const passengerRef = admin.firestore().collection('passengers').doc(id_passenger);
  
      // Check if the passenger exists
      const snapshot = await passengerRef.get();
      if (!snapshot.exists) {
        throw new HttpException(
          'El pasajero no fue encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
  
      // Update the passenger with the new data
      const updateData: any = {};
      if (number_of_trips) updateData.number_of_trips = number_of_trips;
  
      await passengerRef.update(updateData);
  
      return {
        statusCode: 200,
        message: 'Pasajero actualizado exitosamente.',
        data: updateData
      };
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al actualizar el pasajero',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
