import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { firebaseConfig } from '../config/configFirebase';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private firebaseAuth: admin.auth.Auth;
  users = [];

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
      databaseURL: `https://${firebaseConfig.project_id}.firebaseio.com`,
    });
    this.firebaseAuth = admin.auth();
  }

  async signIn(authUser: AuthDto): Promise<object> {
    try {
      const user = await this.firebaseAuth.getUserByEmail(authUser.email);
      const customToken = await this.firebaseAuth.createCustomToken(user.uid);
      console.log(user.uid);
      return {
        statusCode: 200,
        message: 'Inicio de sesión exitoso!',
        token: customToken,
      };
    } catch (error) {
      throw new HttpException(
        'Error al tratar de iniciar sesión.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createUser(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    document_type: string,
    id_user: number,
    type: string,
  ): Promise<object> {
    try {
      const userRecord = await this.firebaseAuth.createUser({
        email,
        password,
      });
      await admin.firestore().collection('users').doc(userRecord.uid).set({
        email,
        first_name,
        last_name,
        document_type,
        id_user,
        type,
      });
      return {
        uid: userRecord.uid,
        statusCode: 200,
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
}
