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

export const getAllReservationsResponse = {
  status: 200,
  description: 'Reservas recuperadas exitosamente.',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Reservas recuperadas exitosamente.' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'Z9L3DjDJd9FRMPLhqTLn' },
            data: {
              type: 'object',
              properties: {
                id_passenger: { type: 'string', example: 'eJphRYmHNt3vwYCM4Q7a' },
                id_route: { type: 'string', example: 'bTGQkP4Jt8WdG7ZvFZpL' },
                payment_method: { type: 'string', example: 'tarjeta de crédito' },
                pick_up_point: { type: 'string', example: 'Avenida Siempre Viva' },
                reservation_status: { type: 'string', example: 'confirmada' },
                fare: { type: 'number', example: 2500 },
                seats_to_reserve: { type: 'number', example: 2 },
              },
            },
          },
        },
      },
    },
  },
};

export const updateReservationBody = {
  type: Object,
  description: 'Datos para actualizar una reserva',
  examples: {
    example: {
      value: {
        id_passenger: 'eJphRYmHNt3vwYCM4Q7a',
        id_route: 'bTGQkP4Jt8WdG7ZvFZpL',
        payment_method: 'tarjeta de crédito',
        pick_up_point: 'Avenida Siempre Viva',
        reservation_status: 'confirmada',
        fare: 2500,
        seats_to_reserve: 2,
      },
      summary: 'Ejemplo de actualización de reserva',
    },
  },
};

export const updateReservationResponse = {
  status: 200,
  description: 'Reserva actualizada exitosamente.',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Reserva actualizada exitosamente.' },
      data: {
        type: 'object',
        properties: {
          id_passenger: { type: 'string', example: 'eJphRYmHNt3vwYCM4Q7a' },
          id_route: { type: 'string', example: 'bTGQkP4Jt8WdG7ZvFZpL' },
          payment_method: { type: 'string', example: 'tarjeta de crédito' },
          pick_up_point: { type: 'string', example: 'Avenida Siempre Viva' },
          reservation_status: { type: 'string', example: 'confirmada' },
          fare: { type: 'number', example: 2500 },
          seats_to_reserve: { type: 'number', example: 2 },
        },
      },
    },
  },
};

export const updateReservationResponseFailed = {
  status: 400,
  description: 'Error al actualizar la reserva',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: {
        type: 'string',
        example: 'Hubo un problema al actualizar la reserva',
      },
    },
  },
};