import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/models/user.dto';
import {
  signUpBody,
  signUpResponse,
  signUpResponseFailed,
} from 'src/documentation/signup';

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
  async getUser(@Param('uid') uid: string): Promise<object> {
    const user = await this.firebaseService.readUser(uid);
    return user;
  }
}
