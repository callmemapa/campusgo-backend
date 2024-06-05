export const vehicleBody = {
  type: Object,
  description: 'Datos para crear un nuevo vehiculo',
  examples: {
    example: {
      value: {
        id_driver: 'nays8PlHMEp43XGgQkzw',
        color: 'negro',
        make: 'chevrolet',
        model: 'sail',
        plate_number: 'ABC123',
        type_vehicle: 'carro',
        year: 2015,
      },
      summary: 'Ejemplo de creación de vehiculo nuevo',
    },
  },
};

export const vehicleResponse = {
  status: 200,
  description: 'Creación de vehiculo exitoso',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      id_vehicle: { type: 'string', example: 'Z9L3DjDJd9FRMPLhqTLn' },
      message: { type: 'string', example: 'Vehiculo creado exitosamente.' },
    },
  },
};

export const vehicleResponseFailed = {
  status: 400,
  description: 'Error al crear el vehiculo',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: {
        type: 'string',
        example: 'Hubo un problema al crear el vehiculo.',
      },
    },
  },
};

export const docGetVehicle = {
  status: 200,
  description: 'Traer la información de un vehículo por ID',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'Z9L3DjDJd9FRMPLhqTLn' },
      data: {
        type: 'object',
        properties: {
          color: { type: 'string', example: 'negro' },
          year: { type: 'number', example: 2015 },
          model: { type: 'string', example: 'sail' },
          plate_number: { type: 'string', example: 'ABC123' },
          type_vehicle: { type: 'string', example: 'carro' },
          make: { type: 'string', example: 'chevrolet' },
        },
      },
    },
  },
};

export const updateVehicleBody = {
  type: Object,
  description: 'Datos para actualizar un vehiculo',
  examples: {
    example: {
      value: {
        id_driver: 'nays8PlHMEp43XGgQkzw',
        color: 'gris',
        make: 'chevrolet',
        model: 'Optra',
        plate_number: 'DEF123',
        type_vehicle: 'carro',
        year: 2015,
      },
      summary: 'Ejemplo de actualización de vehiculo',
    },
  },
};

export const updateVehicleResponse = {
  status: 200,
  description: 'Vehículo actualizado exitosamente.',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      id_driver: { type: 'string', example: 'nays8PlHMEp43XGgQkzw' },
      color: { type: 'string', example: 'negro' },
      year: { type: 'number', example: 2015 },
      model: { type: 'string', example: 'sail' },
      plate_number: { type: 'string', example: 'ABC123' },
      type_vehicle: { type: 'string', example: 'carro' },
      make: { type: 'string', example: 'chevrolet' },
      message: {
        type: 'string',
        example: 'Vehiculo actualizado exitosamente.',
      },
    },
  },
};

export const updateVehicleResponseFailed = {
  status: 400,
  description: 'Error al actualizar el vehiculo',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: {
        type: 'string',
        example: 'Hubo un problema al actualizar el vehiculo.',
      },
    },
  },
};

export const getAllVehiclesResponse = {
  status: 200,
  description: 'Vehículos recuperados exitosamente.',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: {
        type: 'string',
        example: 'Vehículos recuperados exitosamente.',
      },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'Z9L3DjDJd9FRMPLhqTLn' },
            data: {
              type: 'object',
              properties: {
                color: { type: 'string', example: 'negro' },
                year: { type: 'number', example: 2015 },
                model: { type: 'string', example: 'sail' },
                plate_number: { type: 'string', example: 'ABC123' },
                type_vehicle: { type: 'string', example: 'carro' },
                make: { type: 'string', example: 'chevrolet' },
              },
            },
          },
        },
      },
    },
  },
};

export const getAllVehiclesResponseFailed = {
  status: 400,
  description: 'Error al intentar leer los vehículos',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: {
        type: 'string',
        example: 'Error al intentar leer los vehículos',
      },
    },
  },
};
