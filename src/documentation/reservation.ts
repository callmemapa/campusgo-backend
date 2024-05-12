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

export const docGetReservation = {
  status: 200,
  description: 'Traer la información de una reserva por ID',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'fGvWVnRY6hevBguxYrAa' },
      data: {
        type: 'object',
        properties: {
          reservation_status: { type: 'string', example: 'pending' },
          id_passenger: {
            type: 'object',
            properties: {
              _firestore: {
                type: 'object',
                properties: {
                  projectId: { type: 'string', example: 'campusgo-dd61b' },
                },
              },
              _path: {
                type: 'object',
                properties: {
                  segments: {
                    type: 'array',
                    items: { type: 'string', example: 'passengers' },
                  },
                },
              },
              _converter: { type: 'object' },
            },
          },
          id_route: {
            type: 'object',
            properties: {
              _firestore: {
                type: 'object',
                properties: {
                  projectId: { type: 'string', example: 'campusgo-dd61b' },
                },
              },
              _path: {
                type: 'object',
                properties: {
                  segments: {
                    type: 'array',
                    items: { type: 'string', example: 'routes' },
                  },
                },
              },
              _converter: { type: 'object' },
            },
          },
          seats_to_reserve: { type: 'number', example: 2 },
          pick_up_point: { type: 'string', example: 'Comfandi del prado' },
          payment_method: { type: 'string', example: 'efectivo' },
          fare: { type: 'number', example: 6000 },
        },
      },
    },
  },
};
