export const driverBody = {
  type: Object,
  description: 'Datos para crear un nuevo conductor',
  examples: {
    example: {
      value: {
        uid: 'OkTs1Gkm0LX1m2mLAEsx97bGXZw1',
        id_vehicle: 'iMe9H6FrvoWXXKj6fR8K',
      },
      summary: 'Ejemplo de creación de conductor nuevo',
    },
  },
};

export const driverResponse = {
  status: 200,
  description: 'Creación de conductor exitoso',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      id_driver: { type: 'string', example: 'Y0U77JC4buP2mAiycwSm' },
      message: { type: 'string', example: 'Conductor creado exitosamente.' },
    },
  },
};

export const driverResponseFailed = {
  status: 400,
  description: 'Error al crear el conductor',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: {
        type: 'string',
        example: 'Hubo un problema al crear el conductor',
      },
    },
  },
};
