export const driverBody = {
  type: Object,
  description: 'Datos para crear un nuevo conductor',
  examples: {
    example: {
      value: {
        uid: 'OkTs1Gkm0LX1m2mLAEsx97bGXZw1',
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

export const docGetDriver = {
  status: 200,
  description: 'Traer la información de un conductor por ID',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'nays8PlHMEp43XGgQkzw' },
      data: {
        type: 'object',
        properties: {
          reviews: { type: 'array', items: { type: 'object' }, example: [] },
          trips_completed: { type: 'number', example: 0 },
          id_vehicle: {
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
                    items: { type: 'string', example: 'vehicles' },
                  },
                },
              },
              _converter: { type: 'object' },
            },
          },
        },
      },
    },
  },
};

export const updateDriverBody = {
  type: Object,
  description: 'Datos para actualizar un conductor',
  examples: {
    example: {
      value: {
        reviews: [],
        trips_completed: 3,
        id_vehicle: "GGGCx3vWBUAchZO8mrKc"
      },
      summary: 'Ejemplo de actualización de un conductor nuevo',
    }
  },
};

export const updateDriverResponse = {
  status: 200,
  description: 'Conductor actualizado exitosamente.',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example:200 },
      id_driver: { type: 'string', example: 'Y0U77JC4buP2mAiycwSm' },
      message: { type: 'string', example: 'Conductor actualizado exitosamente.'},
    },
  },
};


export const updateDriverResponseFailed = {
  status: 400,
  description: 'Error al actualizar el conductor',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number',  example: 400 },
      message: { type: 'string', example: 'Hubo un problema al actualizar el conductor', },
    },
  },
};

export const getAllDriversResponse = {
  status: 200,
  description: 'Conductores recuperados exitosamente.',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Conductores recuperados exitosamente.' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'driver123' },
            data: {
              type: 'object',
              properties: {
                id_vehicle: { type: 'string', example: 'vehicle123' },
                reviews: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      rating: { type: 'number', example: 5 },
                      comment: { type: 'string', example: 'Excelente conductor' },
                    },
                  },
                },
                trips_completed: { type: 'number', example: 100 },
              },
            },
          },
        },
      },
    },
  },
};

export const getAllDriversResponseFailed = {
  status: 400,
  description: 'Hubo un problema al intentar leer los conductores.',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Hubo un problema al intentar leer los conductores.' }
    },
  },
};
