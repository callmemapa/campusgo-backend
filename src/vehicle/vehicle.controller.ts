import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VehicleDto } from 'src/models/vehicle.dto';
import {
  vehicleBody,
  vehicleResponse,
  vehicleResponseFailed,
} from 'src/documentation/vehicle';

@ApiTags('vehicle')
@Controller('api/vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Post('createVehicle')
  @ApiBody(vehicleBody)
  @ApiResponse(vehicleResponse)
  @ApiResponse(vehicleResponseFailed)
  @ApiOperation({ summary: 'Creación de vehiculo' })
  postVehicle(@Body() vehicle: VehicleDto): object {
    return this.vehicleService.createVehicle(
      vehicle.id_driver,
      vehicle.color,
      vehicle.make,
      vehicle.model,
      vehicle.plate_number,
      vehicle.type_vehicle,
      vehicle.year,
    );
  }

  @Get('readVehicle/:id')
  async getVehicle(@Param('id') id: string): Promise<object> {
    const user = await this.vehicleService.getVehicle(id);
    return user;
  }
}
