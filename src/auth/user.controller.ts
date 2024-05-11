import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  signUpBody,
  signUpResponse,
  signUpResponseFailed,
} from 'src/documentation/signup';
import { UserDto } from 'src/models/user.dto';

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
}
