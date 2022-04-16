module.exports = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ASMAN TIGER API',
            version: '2.0.1',
            description: '**Asman** Tiger system API documentation.',
            contact: {
                name: 'Agamyrat Chariyev',
                email: 'agamyrat.chariyev@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://{host}:{port}/api',
                variables: {
                    host: {
                        enum: ['10.10.8.27', 'localhost'],
                        default: 'localhost',
                    },
                    port: {
                        default: '3001',
                    },
                },
            },
        ],

        components: {
            securitySchemes: {
                basicAuth: {
                    type: 'http',
                    scheme: 'basic',
                },
            },
            parameters: {
                offsetParam: {
                    in: 'query',
                    name: 'offset',
                    description:
                        'The number of items to skip before starting to collect the result set',
                    required: false,
                    schema: {
                        type: 'integer',
                        minimum: 0,
                    },
                },
                limitParam: {
                    in: 'query',
                    name: 'limit',
                    required: false,
                    description: 'The numbers of items to return.',
                    schema: {
                        type: 'integer',
                        minimum: 1,
                        default: 20,
                    },
                },
            },
            responses: {
                UnauthorizedError: {
                    description:
                        'Authentication information is missing or invalid',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'fail',
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Missing Authorization Header',
                                    },
                                },
                            },
                        },
                    },
                },
                PathIdRequiredError: {
                    description: 'ID is required',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'fail',
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Id is required',
                                    },
                                },
                            },
                        },
                    },
                },
                NotFoundError: {
                    description: '[Model] is not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'fail',
                                    },
                                    message: {
                                        type: 'string',
                                        example: '[Model] is not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        security: [
            {
                basicAuth: [],
            },
        ],
    },
    apis: ['./v1-route.js', './v2/routes/*js', './v2/sequelize/models/*js'],
};
