import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RouteDto } from 'src/models/route.dto';
import {
  routeBody,
  routeResponse,
  routeResponseFailed,
  docGetRoute,
  getAllRoutesResponse,
  getAllRoutesResponseFailed,
  updateRouteBody,
  updateRouteResponse,
  updateRouteResponseFailed,
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

  @Put('updateRoute/:id_route')
  @ApiOperation({ summary: 'Actualizar una ruta' })
  @ApiBody(updateRouteBody)
  @ApiResponse(updateRouteResponse)
  @ApiResponse(updateRouteResponseFailed)
  async updateRoute(
    @Param('id_route') id_route: string,
    @Body()
    updateData: {
      id_driver?: string;
      date?: Date;
      origin?: string;
      destination?: string;
      latitude_origin?: number;
      longitude_origin?: number;
      latitude_destination?: number;
      longitude_destination?: number;
      distance?: string;
      estimate_time?: string;
      price?: number;
      seating_capacity?: number;
      waypoints?: Array<string>;
      isComplete?: boolean;
    },
  ): Promise<object> {
    try {
      const result = await this.routeService.updateRoute(
        id_route,
        updateData.id_driver,
        updateData.date,
        updateData.origin,
        updateData.destination,
        updateData.latitude_origin,
        updateData.longitude_origin,
        updateData.latitude_destination,
        updateData.longitude_destination,
        updateData.distance,
        updateData.estimate_time,
        updateData.price,
        updateData.seating_capacity,
        updateData.waypoints,
        updateData.isComplete,
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Hubo un problema al actualizar la ruta',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getAllRoutes')
  @ApiOperation({ summary: 'Obtener todas las rutas' })
  @ApiResponse(getAllRoutesResponse)
  @ApiResponse(getAllRoutesResponseFailed)
  async getAllRoutes(): Promise<object> {
    try {
      const result = await this.routeService.getAllRoutes();
      return result;
    } catch (error) {
      throw new HttpException(
        'Error al intentar leer las rutas',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }
}
