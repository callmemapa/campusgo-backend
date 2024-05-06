export const loginBody = {
  type: Object,
  description: 'Datos de inicio de sesión',
  examples: {
    example: {
      value: {
        email: 'usuario@example.com',
        password: 'contraseña123',
      },
      summary: 'Ejemplo de inicio de sesión',
    },
  },
};

export const loginResponse = {
  status: 200,
  description: 'Inicio de sesión exitoso',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Inicio de sesión exitoso' },
      token: {
        type: 'string',
        example:
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTcxNDk1MjE4OSwiZXhwIjoxNzE0OTU1Nzg5LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1pcGdldkBjYW1wdXNnby1kZDYxYi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWlwZ2V2QGNhbXB1c2dvLWRkNjFiLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoidUNaTE0wakwwd1VZSEphc0I2S3FqQTM4b0ZoMSJ9.ChDZm4z6mBTPJUOHgZFfdW5JDhWw6atoap-UyEBQdVcSo0CzF3Skz22TaQA5qrB6CTrlvSZJI7Af1GeqIGDjITrFzNJ9B8eesUlMkfiedze2iWsHnnk4o8lfGJq7y-hKb2L9xHjhmpnxFPGMPctssLDgLOlNd08XaEZiEMhBf33AN9uRTVZqdZS2usjAMVqYlVu-3xANAWmpJTuYhlErkWu6xdXUnk20cQEqegwu8Q5XFrfZL_XhgeujfPXluOo8RJhdeXblvX1HgOXOEbzJsO_2uj5UiqHrlU__9mBXBd0mz2GFQRHIJUfuiF7-X4S4VeCThgB4jrPOHcWgsZ5y_g',
      },
    },
  },
};

export const loginResponseFailed = {
  status: 400,
  description: 'Inicio de sesión no exitoso',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: {
        type: 'string',
        example: 'Error al tratar de iniciar sesión.',
      },
    },
  },
};
