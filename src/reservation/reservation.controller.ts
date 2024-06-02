import { Controller, Post, Body, Get, Put, HttpStatus, HttpException, Param } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReservationDto } from 'src/models/reservation.dto';
import {
  docGetReservation,
  reservationBody,
  reservationResponse,
  reservationResponseFailed,
  updateReservationBody,
  updateReservationResponse,
  updateReservationResponseFailed,
  getAllReservationsResponse
} from 'src/documentation/reservation';

@ApiTags('reservation')
@Controller('api/reservation')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Post('createReservation')
  @ApiBody(reservationBody)
  @ApiResponse(reservationResponse)
  @ApiResponse(reservationResponseFailed)
  @ApiOperation({ summary: 'Creación de reserva' })
  postReservation(@Body() reservation: ReservationDto): object {
    return this.reservationService.createReservation(
      reservation.id_passenger,
      reservation.id_route,
      reservation.payment_method,
      reservation.pick_up_point,
      reservation.reservation_status,
      reservation.fare,
      reservation.seats_to_reserve,
    );
  }

  @Get('readReservation/:id')
  @ApiResponse(docGetReservation)
  @ApiOperation({ summary: 'Traer la información de una reserva por ID' })
  async getDriver(@Param('id') id: string): Promise<object> {
    const user = await this.reservationService.readReservation(id);
    return user;
  }

  @Get('getAllReservations')
  @ApiOperation({ summary: 'Obtener todas las reservas' })
  @ApiResponse(getAllReservationsResponse)
  @ApiResponse({
    status: 400,
    description: 'Error al intentar leer las reservas.',
  })
  async getAllReservations(): Promise<object> {
    try {
      const result = await this.reservationService.getAllReservations();
      return result;
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer las reservas',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('updateReservation/:id_reservation')
  @ApiOperation({ summary: 'Actualizar una reserva' })
  @ApiBody(updateReservationBody)
  @ApiResponse(updateReservationResponse)
  @ApiResponse(updateReservationResponseFailed)
  async updateReservation(
    @Param('id_reservation') id_reservation: string,
    @Body() updateData: {
      id_passenger?: string,
      id_route?: string,
      payment_method?: string,
      pick_up_point?: string,
      reservation_status?: string,
      fare?: number,
      seats_to_reserve?: number,
    },
  ): Promise<object> {
    try {
      const result = await this.reservationService.updateReservation(
        id_reservation,
        updateData.id_passenger,
        updateData.id_route,
        updateData.payment_method,
        updateData.pick_up_point,
        updateData.reservation_status,
        updateData.fare,
        updateData.seats_to_reserve,
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al actualizar la reserva',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

}
