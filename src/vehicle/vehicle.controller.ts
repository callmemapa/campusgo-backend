import { Controller, Post, Put, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VehicleDto } from 'src/models/vehicle.dto';
import {
  vehicleBody,
  vehicleResponse,
  vehicleResponseFailed,
  docGetVehicle,
  updateVehicleBody,
  updateVehicleResponse,
  updateVehicleResponseFailed,
  getAllVehiclesResponse,
  getAllVehiclesResponseFailed
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
  @ApiResponse(docGetVehicle)
  @ApiOperation({ summary: 'Traer la información de un vehículo por ID' })
  async getVehicle(@Param('id') id: string): Promise<object> {
    const vehicle = await this.vehicleService.getVehicle(id);
    return vehicle;
  }

  @Put('updateVehicle/:id')
  @ApiBody(updateVehicleBody) // Puedes definir un cuerpo específico para la actualización si lo deseas
  @ApiResponse(updateVehicleResponse)
  @ApiResponse(updateVehicleResponseFailed)
  @ApiOperation({ summary: 'Actualizar la información de un vehículo' })
  async updateVehicle(
    @Param('id') id: string,
    @Body() vehicle: VehicleDto,
  ): Promise<object> {
    return this.vehicleService.updateVehicle(
      id,
      vehicle.color,
      vehicle.make,
      vehicle.model,
      vehicle.plate_number,
      vehicle.type_vehicle,
      vehicle.year,
    );
  }

  @Get('getAllVehicles')
  @ApiOperation({ summary: 'Obtener todos los vehículos' })
  @ApiResponse(getAllVehiclesResponse)
  @ApiResponse(getAllVehiclesResponseFailed)
  async getAllVehicles(): Promise<object> {
    try {
      const result = await this.vehicleService.getAllVehicles();
      return result;
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer los vehículos',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }
}
