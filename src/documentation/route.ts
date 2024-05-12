export const routeBody = {
  type: Object,
  description: 'Datos para crear una nueva ruta',
  examples: {
    example: {
      value: {
        id_driver: 'nays8PlHMEp43XGgQkzw',
        date: '11 de mayo de 2024, 8:00:00 a.m. UTC-5',
        origin: 'Lopez pan',
        destination: 'Universidad del Valle',
        latitude_origin: 3.45407,
        longitude_origin: -76.48188,
        latitude_destination: 3.55098,
        longitude_destination: -76.298088,
        distance: '13km',
        estimate_time: '33min',
        price: 3000,
        seating_capacity: 4,
        waypoints: ['Autopista suroriental'],
      },
      summary: 'Ejemplo de creación de ruta nueva',
    },
  },
};

export const routeResponse = {
  status: 200,
  description: 'Creación de ruta exitosa',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      id_route: { type: 'string', example: 'o3nT5H0eJHpZxC86ABj6' },
      message: { type: 'string', example: 'Ruta creado exitosamente.' },
    },
  },
};

export const routeResponseFailed = {
  status: 400,
  description: 'Error al crear la ruta',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: {
        type: 'string',
        example: 'Hubo un problema al crear la ruta',
      },
    },
  },
};

export const docGetRoute = {
  status: 200,
  description: 'Traer la información de una ruta por ID',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'o3nT5H0eJHpZxC86ABj6' },
      data: {
        type: 'object',
        properties: {
          date: { type: 'string', example: '11 de mayo de 2024, 8:00:00 a.m. UTC-5' },
          distance: { type: 'string', example: '13km' },
          origin: { type: 'string', example: 'Lopez pan' },
          destination: { type: 'string', example: 'Universidad del Valle' },
          waypoints: {
            type: 'array',
            items: { type: 'string', example: 'Autopista suroriental' },
          },
          longitude_destination: { type: 'number', example: -76.298088 },
          latitude_origin: { type: 'number', example: 3.45407 },
          seating_capacity: { type: 'number', example: 4 },
          longitude_origin: { type: 'number', example: -76.48188 },
          estimate_time: { type: 'string', example: '33min' },
          price: { type: 'number', example: 3000 },
          latitude_destination: { type: 'number', example: 3.55098 },
          id_driver: {
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
                    items: { type: 'string', example: 'drivers' },
                  },
                },
              },
              _converter: { type: 'object' },
            },
          },
          isComplete: { type: 'boolean', example: false },
        },
      },
    },
  },
};
