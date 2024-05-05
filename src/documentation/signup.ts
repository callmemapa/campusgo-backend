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
