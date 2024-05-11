import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseService } from './auth/firebase.service';
import { UserController } from './auth/user.controller';
import { DriverController } from './auth/driver.controller';
import { PassengerController } from './auth/passenger.controller';

@Module({
  imports: [JwtModule.register({})],
  controllers: [
    AppController,
    UserController,
    DriverController,
    PassengerController,
  ],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
