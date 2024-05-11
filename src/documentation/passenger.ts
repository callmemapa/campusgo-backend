export const passengerBody = {
  type: Object,
  description: 'Datos para crear un nuevo pasajero',
  examples: {
    example: {
      value: {
        uid: 'OkTs1Gkm0LX1m2mLAEsx97bGXZw1',
      },
      summary: 'Ejemplo de creación de pasajero nuevo',
    },
  },
};

export const passengerResponse = {
  status: 200,
  description: 'Creación de pasajero exitoso',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      id_driver: { type: 'string', example: 'CPtzC9zJv7TqsMmuFt4O' },
      message: { type: 'string', example: 'Pasajero creado exitosamente.' },
    },
  },
};

export const passengerResponseFailed = {
  status: 400,
  description: 'Error al crear el pasajero',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: {
        type: 'string',
        example: 'Hubo un problema al crear el pasajero',
      },
    },
  },
};
