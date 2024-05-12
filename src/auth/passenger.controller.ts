import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ApiBody, ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassengerDto } from 'src/models/passenger.dto';
import {
  passengerBody,
  passengerResponse,
  passengerResponseFailed,
  docGetPassenger,
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

  @Get('readPassenger/:id')
  @ApiResponse(docGetPassenger)
  @ApiOperation({ summary: 'Traer la información de un pasajero por ID' })
  async getPassenger(@Param('id') id: string): Promise<object> {
    const user = await this.firebaseService.readPassenger(id);
    return user;
  }
}
