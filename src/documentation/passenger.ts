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
      id_passenger: { type: 'string', example: 'CPtzC9zJv7TqsMmuFt4O' },
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

export const docGetPassenger = {
  status: 200,
  description: 'Traer la información de un pasajero por ID',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'apIspnAkD8WY0Zf4BCpJ' },
      data: {
        type: 'object',
        properties: {
          number_of_trips: { type: 'number', example: 0 },
        },
      },
    },
  },
};

export const updatePassengerBody = {
  type: Object,
  description: 'Datos para actualizar un pasajero',
  examples: {
    example: {
      value: {
        number_of_trips: 5,
      },
      summary: 'Ejemplo de actualización de pasajero',
    },
  },
};

export const updatePassengerResponse = {
  status: 200,
  description: 'Pasajero actualizado exitosamente.',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      number_of_trips: { type: 'number', example: 10 },
      message: { type: 'string', example: 'Pasajero creado exitosamente.' },
    },
  },
};

export const updatePassengerResponseFailed = {
  status: 400,
  description: 'Hubo un problema al actualizar el pasajero',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: {
        type: 'string',
        example: 'Hubo un problema al actualizar el pasajero',
      },
    },
  },
};

export const getAllPassengersResponse = {
  status: 200,
  description: 'Pasajeros recuperados exitosamente.',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: {
        type: 'string',
        example: 'Pasajeros recuperados exitosamente.',
      },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'passenger123' },
            data: {
              type: 'object',
              properties: {
                number_of_trips: { type: 'number', example: 10 },
              },
            },
          },
        },
      },
    },
  },
};

export const getAllPassengersResponseFailed = {
  status: 400,
  description: 'Hubo un problema al intentar leer los pasajeros.',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: {
        type: 'string',
        example: 'Hubo un problema al intentar leer los pasajeros.',
      },
    },
  },
};
