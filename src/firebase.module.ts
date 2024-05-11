import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firebaseConfig } from './config/configFirebase';

@Global()
@Module({})
export class FirebaseModule {
  static initialized = false;

  static initializeApp() {
    if (!FirebaseModule.initialized) {
      const firebaseConfigModule = firebaseConfig;

      admin.initializeApp({
        credential: admin.credential.cert(
          firebaseConfigModule as admin.ServiceAccount,
        ),
        databaseURL: `https://${firebaseConfigModule.project_id}.firebaseio.com`,
      });

      FirebaseModule.initialized = true;
    }
  }
}
