import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ApiBody, ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassengerDto } from 'src/models/passenger.dto';
import {
  passengerBody,
  passengerResponse,
  passengerResponseFailed,
} from 'src/documentation/passenger';

@ApiTags('auth')
@Controller('api/auth')
export class PassengerController {
  constructor(private firebaseService: FirebaseService) {}

  @Post('createPassenger')
  @ApiBody(passengerBody)
  @ApiResponse(passengerResponse)
  @ApiResponse(passengerResponseFailed)
  @ApiOperation({ summary: 'Creación de pasajero' })
  postPassenger(@Body() passenger: PassengerDto): object {
    return this.firebaseService.createPassenger(passenger.uid, 0);
  }
}
