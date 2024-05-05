import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    this.getUsers();
  }

  getFirebase(): string {
    return 'Hello from firebase service!';
  }

  postLogin(user: AuthDto): object {
    return { user: user.email, password: user.password };
  }

  async getUsers(): Promise<any> {
    try {
      const userRecords = await this.firebaseAuth.listUsers();
      const users = userRecords.users.map((user) => ({
        uid: user.uid,
        email: user.email,
        passwordHash: user.passwordHash,
        passwordSalt: user.passwordSalt,
      }));
      this.users = users;
      return users;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  findUserByEmail(email: string): any {
    return this.users.find((user) => user.email === email);
  }

  async signIn(email: string, password: string): Promise<string> {
    try {
      const user = await this.firebaseAuth.getUserByEmail(email);
      console.log(user);
      // const userFirebase = await this.findUserByEmail(email);
      // const userFirebasePassword = userFirebase.passwordHash;
      const customToken = await this.firebaseAuth.createCustomToken(user.uid);
      return customToken;
    } catch (error) {
      console.error('Error signing in:', error);
      throw UnauthorizedException;
    }
  }

  async createUser(
    email: string,
    password: string,
  ): Promise<admin.auth.UserRecord> {
    try {
      const userRecord = await this.firebaseAuth.createUser({
        email,
        password,
      });
      return userRecord;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}
