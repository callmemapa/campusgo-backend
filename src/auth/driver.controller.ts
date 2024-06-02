import { Controller, Get, Post, Put, Body, Param, HttpException, HttpStatus  } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DriverDto} from 'src/models/driver.dto';
import { ReviewDto } from 'src/models/review.dto';
import {
  driverBody,
  driverResponse,
  driverResponseFailed,
  docGetDriver,
  updateDriverBody,
  updateDriverResponse,
  updateDriverResponseFailed,
  getAllDriversResponse,
  getAllDriversResponseFailed
} from 'src/documentation/driver';

@ApiTags('auth')
@Controller('api/auth')
export class DriverController {
  constructor(private firebaseService: FirebaseService) {}

  @Post('createDriver')
  @ApiBody(driverBody)
  @ApiResponse(driverResponse)
  @ApiResponse(driverResponseFailed)
  @ApiOperation({ summary: 'Creación de conductor' })
  postDriver(@Body() driver: DriverDto): object {
    return this.firebaseService.createDriver(driver.uid, [], 0);
  }

  @Get('readDriver/:id')
  @ApiOperation({ summary: 'Traer la información de un conductor por ID' })
  @ApiResponse(docGetDriver)
  async getDriver(@Param('id') id: string): Promise<object> {
    const user = await this.firebaseService.readDriver(id);
    return user;
  }

  @Get('getAllDrivers')
  @ApiOperation({ summary: 'Obtener la información de todos los conductores' })
  @ApiResponse(getAllDriversResponse)
  @ApiResponse(getAllDriversResponseFailed)
  async getAllDrivers(): Promise<object> {
    return this.firebaseService.getAllDrivers();
  }

  @Put('updateDriver/:id_driver')
  @ApiOperation({ summary: 'Actualizar la información de un conductor' })
  @ApiBody(updateDriverBody) // Define un cuerpo específico para la actualización
  @ApiResponse(updateDriverResponse)
  @ApiResponse(updateDriverResponseFailed)
  async updateDriver(
    @Param('id_driver') id_driver: string,
    @Body() updateDriverDto: {
      reviews?: Array<ReviewDto>,
      trips_completed?: number,
      id_vehicle?: string,
    }
  ): Promise<object> {
    try {
      return await this.firebaseService.updateDriver(
        id_driver,
        updateDriverDto.reviews,
        updateDriverDto.trips_completed,
        updateDriverDto.id_vehicle,
      );
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al actualizar el conductor',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
