import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseService } from './auth/firebase.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AppController, AuthController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
