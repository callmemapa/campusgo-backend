import { Controller, Get, Post, Body } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private firebaseService: FirebaseService) {}

  @Get('firebase')
  getFirebaseService(): string {
    return this.firebaseService.getFirebase();
  }

  @Post('login')
  postLogin(@Body() authDto: AuthDto): object {
    return this.firebaseService.signIn(authDto.email, authDto.password);
  }

  @Post('signup')
  postRegister(@Body() authDto: AuthDto): object {
    return this.firebaseService.createUser(authDto.email, authDto.password);
  }

  @Get('users')
  getUsers(): any {
    return this.firebaseService.getUsers();
  }
}
