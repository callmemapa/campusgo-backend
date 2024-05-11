export const reservationBody = {
  type: Object,
  description: 'Datos para crear una nueva reserva',
  examples: {
    example: {
      value: {
        uid: 'OkTs1Gkm0LX1m2mLAEsx97bGXZw1',
        id_vehicle: 'iMe9H6FrvoWXXKj6fR8K',
      },
      summary: 'Ejemplo de creación de reserve nueva',
    },
  },
};

export const reservationResponse = {
  status: 200,
  description: 'Creación de reserva exitosa',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      id_reservation: { type: 'string', example: 'fGvWVnRY6hevBguxYrAa' },
      message: { type: 'string', example: 'Reserva creada exitosamente.' },
    },
  },
};

export const reservationResponseFailed = {
  status: 400,
  description: 'Error al crear la reserva',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: {
        type: 'string',
        example: 'Hubo un problema al crear la reserva',
      },
    },
  },
};
