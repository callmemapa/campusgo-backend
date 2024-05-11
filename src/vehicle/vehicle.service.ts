import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseModule } from 'src/firebase.module';

@Injectable()
export class VehicleService {
  constructor() {
    FirebaseModule.initializeApp();
  }

  async createVehicle(
    id_driver: string,
    color: string,
    make: string,
    model: string,
    plate_number: string,
    type_vehicle: string,
    year: number,
  ): Promise<object> {
    try {
      const vehicleRef = await admin.firestore().collection('vehicles').add({
        color,
        make,
        model,
        plate_number,
        type_vehicle,
        year,
      });
      await admin.firestore().collection('drivers').doc(id_driver).set(
        {
          id_vehicle: vehicleRef,
        },
        { merge: true },
      );
      return {
        statusCode: 200,
        id_vehicle: vehicleRef.id,
        message: 'Vehiculo creado exitosamente.',
      };
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al crear el vehiculo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
