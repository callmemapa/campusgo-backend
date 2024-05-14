export const signUpBody = {
  type: Object,
  description: 'Datos para crear un nuevo usuario',
  examples: {
    example: {
      value: {
        email: 'usuario@example.com',
        password: 'contraseña123',
        first_name: 'Pepito',
        last_name: 'Perez',
        type: 'passenger',
        document_type: 'CC',
        id_user: 123456789,
        phone_number: '+5731100044444',
        address: 'CALLE 13 # 73 - 42',
        url_profile_photo: 'none',
      },
      summary: 'Ejemplo de creación de usuario nuevo',
    },
  },
};

export const signUpResponse = {
  status: 200,
  description: 'Creación de usuario exitoso',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      uid: { type: 'string', example: 'BYlF43wnzTMtfr96CiwuZUpqnrO2' },
      message: { type: 'string', example: 'Usuario creado exitosamente.' },
    },
  },
};

export const signUpResponseFailed = {
  status: 400,
  description: 'Usuario existente',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: {
        type: 'string',
        example:
          'La dirección de correo electrónico ya está en uso por otra cuenta.',
      },
    },
  },
};

export const docGetUser = {
  status: 200,
  description: 'Traer la información de un usuario por UID',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'IhqwFXnXdWP2msj2vr2tbRSVTD22' },
      data: {
        type: 'object',
        properties: {
          url_profile_photo: { type: 'string', example: 'none' },
          document_number: { type: 'number', example: 123456789 },
          address: { type: 'string', example: 'CALLE 13 # 73 - 42' },
          last_name: { type: 'string', example: 'Perez' },
          phone_number: { type: 'string', example: '+5731100044444' },
          first_name: { type: 'string', example: 'Pepito' },
          email: {
            type: 'string',
            example: 'pepito.perez@correounivalle.edu.co',
          },
          document_type: { type: 'string', example: 'CC' },
          isDriver: { type: 'boolean', example: true },
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
          isPassenger: { type: 'boolean', example: true },
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
        },
      },
    },
  },
};
