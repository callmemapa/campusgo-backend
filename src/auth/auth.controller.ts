import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { AuthDto, LoginDto } from './auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  loginBody,
  loginResponse,
  loginResponseFailed,
} from '../documentation/login';
import {
  signUpBody,
  signUpResponse,
  signUpResponseFailed,
} from 'src/documentation/signup';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private firebaseService: FirebaseService) {}

  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesión' })
  @ApiBody(loginBody)
  @ApiResponse(loginResponse)
  @ApiResponse(loginResponseFailed)
  @HttpCode(200)
  postLogin(@Body() authDto: AuthDto): object {
    return this.firebaseService.signIn(authDto);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Creación de un usuario' })
  @ApiBody(signUpBody)
  @ApiResponse(signUpResponse)
  @ApiResponse(signUpResponseFailed)
  postRegister(@Body() user: LoginDto): object {
    return this.firebaseService.createUser(
      user.email,
      user.password,
      user.first_name,
      user.last_name,
      user.document_type,
      user.id_user,
      user.type,
    );
  }
}
