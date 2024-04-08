const options = {
    definition: {
        openapi: '3.0.0', // Use OpenAPI 3.0
        info: {
            title: 'Node.js API',
            version: '1.0.0',
            description: "API to demonstrate Swagger integration with Node.js"
        },
        servers: [
            {
                url: `http://localhost:${3000}`
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js']
};

module.exports = options;
