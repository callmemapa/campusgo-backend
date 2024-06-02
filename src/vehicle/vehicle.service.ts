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

  async getVehicle(id_vehicle: string): Promise<object> {
    try {
      const docRef = admin.firestore().collection('vehicles').doc(id_vehicle);
      const snapshot = await docRef.get();

      if (snapshot.exists) {
        return {
          id: snapshot.id,
          data: snapshot.data(),
        };
      } else {
        throw new HttpException(
          'El vehiculo no fue encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer el vehiculo',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  async updateVehicle(
    id_vehicle: string,
    color?: string,
    make?: string,
    model?: string,
    plate_number?: string,
    type_vehicle?: string,
    year?: number,
  ): Promise<object> {
    try {
      const vehicleRef = admin.firestore().collection('vehicles').doc(id_vehicle);
      
      // Check if the vehicle exists
      const snapshot = await vehicleRef.get();
      if (!snapshot.exists) {
        throw new HttpException(
          'El vehiculo no fue encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      // Update the vehicle with the new data
      const updateData: any = {};
      if (color) updateData.color = color;
      if (make) updateData.make = make;
      if (model) updateData.model = model;
      if (plate_number) updateData.plate_number = plate_number;
      if (type_vehicle) updateData.type_vehicle = type_vehicle;
      if (year) updateData.year = year;

      await vehicleRef.update(updateData);

      return {
        statusCode: 200,
        message: 'Vehiculo actualizado exitosamente.',
        data: updateData
      };
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al actualizar el vehiculo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllVehicles(): Promise<object> {
    try {
      const vehiclesRef = admin.firestore().collection('vehicles');
      const snapshot = await vehiclesRef.get();
  
      if (snapshot.empty) {
        throw new HttpException(
          'No se encontraron vehículos',
          HttpStatus.NOT_FOUND,
        );
      }
  
      const vehicles: Array<object> = [];
      snapshot.forEach(doc => {
        vehicles.push({
          id: doc.id,
          data: doc.data(),
        });
      });
  
      return {
        statusCode: 200,
        message: 'Vehículos recuperados exitosamente.',
        data: vehicles,
      };
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer los vehículos',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }
}
