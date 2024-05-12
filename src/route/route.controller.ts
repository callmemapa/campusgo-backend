import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RouteService } from './route.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RouteDto } from 'src/models/route.dto';
import {
  routeBody,
  routeResponse,
  routeResponseFailed,
  docGetRoute,
} from 'src/documentation/route';

@ApiTags('route')
@Controller('api/route')
export class RouteController {
  constructor(private routeService: RouteService) {}

  @Post('createRoute')
  @ApiBody(routeBody)
  @ApiResponse(routeResponse)
  @ApiResponse(routeResponseFailed)
  @ApiOperation({ summary: 'Creación de ruta' })
  postRoute(@Body() route: RouteDto): object {
    return this.routeService.createRoute(
      route.id_driver,
      route.date,
      route.origin,
      route.destination,
      route.latitude_origin,
      route.longitude_origin,
      route.latitude_destination,
      route.longitude_destination,
      route.distance,
      route.estimate_time,
      route.price,
      route.seating_capacity,
      route.waypoints,
      false,
    );
  }

  @Get('readRoute/:id')
  @ApiResponse(docGetRoute)
  @ApiOperation({ summary: 'Traer la información de una ruta por ID' })
  async getDriver(@Param('id') id: string): Promise<object> {
    const user = await this.routeService.readRoute(id);
    return user;
  }
}
