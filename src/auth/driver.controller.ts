import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DriverDto } from 'src/models/driver.dto';
import {
  driverBody,
  driverResponse,
  driverResponseFailed,
  docGetDriver,
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
}
