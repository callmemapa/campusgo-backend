import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseService } from './auth/firebase.service';
import { UserController } from './auth/user.controller';
import { DriverController } from './auth/driver.controller';
import { PassengerController } from './auth/passenger.controller';
import { VehicleController } from './vehicle/vehicle.controller';
import { VehicleService } from './vehicle/vehicle.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [
    AppController,
    UserController,
    DriverController,
    PassengerController,
    VehicleController,
  ],
  providers: [AppService, FirebaseService, VehicleService],
})
export class AppModule {}
