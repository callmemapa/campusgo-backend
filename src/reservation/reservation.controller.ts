import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReservationDto } from 'src/models/reservation.dto';
import {
  reservationBody,
  reservationResponse,
  reservationResponseFailed,
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
  async getDriver(@Param('id') id: string): Promise<object> {
    const user = await this.reservationService.readReservation(id);
    return user;
  }
}
