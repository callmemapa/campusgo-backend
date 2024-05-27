import { Controller, Post, Body, Get, Put, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ApiBody, ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassengerDto } from 'src/models/passenger.dto';
import {
  passengerBody,
  passengerResponse,
  passengerResponseFailed,
  docGetPassenger,
  updatePassengerBody,
  updatePassengerResponse,
  updatePassengerResponseFailed,
  getAllPassengersResponse,
  getAllPassengersResponseFailed
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

  @Get('getAllPassengers')
  @ApiOperation({ summary: 'Obtener la información de todos los pasajeros' })
  @ApiResponse(getAllPassengersResponse)
  @ApiResponse(getAllPassengersResponseFailed)
  async getAllPassengers(): Promise<object> {
    return this.firebaseService.getAllPassengers();
  }

  @Put('updatePassenger/:id_passenger')
  @ApiOperation({ summary: 'Actualizar la información de un pasajero' })
  @ApiBody(updatePassengerBody)
  @ApiResponse(updatePassengerResponse)
  @ApiResponse(updatePassengerResponseFailed)
  async updatePassenger(
    @Param('id_passenger') id_passenger: string,
    @Body() updatePassengerDto: {
      number_of_trips?: number,
    }
  ): Promise<object> {
    try {
      const result = await this.firebaseService.updatePassenger(
        id_passenger,
        updatePassengerDto.number_of_trips,
      );

      return {
        statusCode: 200,
        message: 'Pasajero actualizado exitosamente.',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al actualizar el pasajero',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
