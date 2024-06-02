import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/models/user.dto';
import {
  signUpBody,
  signUpResponse,
  signUpResponseFailed,
  docGetUser,
  updateUserBody,
  updateUserResponse,
  updateUserResponseFailed,
  getAllUsersResponse,
  getAllUsersResponseFailed

} from 'src/documentation/signup';
import { LoginDto } from 'src/models/login.dto';

@ApiTags('auth')
@Controller('api/auth')
export class UserController {
  constructor(private firebaseService: FirebaseService) {}

  @Post('createUser')
  @ApiOperation({ summary: 'Creación de un usuario' })
  @ApiBody(signUpBody)
  @ApiResponse(signUpResponse)
  @ApiResponse(signUpResponseFailed)
  postRegister(@Body() user: UserDto): object {
    return this.firebaseService.createUser(
      user.document_type,
      user.document_number,
      user.first_name,
      user.last_name,
      user.email,
      user.password,
      user.phone_number,
      user.address,
      user.url_profile_photo,
    );
  }

  @Get('readUser/:uid')
  @ApiOperation({ summary: 'Traer la información de un usuario por su UID' })
  @ApiResponse(docGetUser)
  async getUser(@Param('uid') uid: string): Promise<object> {
    const user = await this.firebaseService.readUser(uid);
    return user;
  }

  @Post('verifyToken')
  @ApiOperation({ summary: 'Login de usuario' })
  @ApiResponse(signUpResponse)
  @ApiResponse(signUpResponseFailed)
  verifyIdToken(@Body() user: LoginDto): object {
    console.log(user.idToken)
    return this.firebaseService.verifyIdToken(user.idToken
    );
  }
}

  @Get('getAllUsers')
  @ApiOperation({ summary: 'Obtener la información de todos los usuarios' })
  @ApiResponse(getAllUsersResponse)
  @ApiResponse(getAllUsersResponseFailed)
  async getAllUsers(): Promise<object> {
    return this.firebaseService.getAllUsers();
  }

  @Put('updateUser/:uid')
  @ApiBody(updateUserBody) // Puedes definir un cuerpo específico para la actualización si lo deseas
  @ApiResponse(updateUserResponse)
  @ApiResponse(updateUserResponseFailed)
  @ApiOperation({ summary: 'Actualizar la información de un usuario' })
  async updateUser(
    @Param('uid') uid: string,
    @Body() user: UserDto,
  ): Promise<object> {
    return this.firebaseService.updateUser(
      uid,
      user.document_type,
      user.document_number,
      user.first_name,
      user.last_name,
      user.email,
      user.phone_number,
      user.address,
      user.url_profile_photo,
    );
  }
}