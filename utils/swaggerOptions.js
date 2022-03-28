module.exports = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ASMAN TIGER API',
            version: '1.0.0',
            description: '**Asman** Tiger system API documentation.',
        },
        servers: [
            {
                url: '{protocol}://{host}:{port}/api/v{version}',
                title: 'asdf',
                variables: {
                    protocol: {
                        enum: ['http', 'https'],
                        default: 'http',
                    },
                    host: {
                        enum: ['10.10.8.27', 'localhost'],
                        default: '10.10.8.27',
                    },
                    port: {
                        default: '3001',
                    },
                    version: {
                        default: '2',
                        enum: [1, 2],
                    },
                },
            },
        ],
        components: {
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
                    description:
                        'The numbers of items to return. If request empty or null by default hardLimit is used',
                    schema: {
                        type: 'integer',
                        minimum: 1,
                        default: 20,
                    },
                },
            },
            // securitySchemes: {
            //     bearerAuth: {
            //         type: 'http',
            //         scheme: 'basic',
            //         bearerFormat: 'JWT',
            //     },
            // },
        },
        // security: [
        //     {
        //         bearerAuth: [],
        //     },
        // ],
    },
    apis: ['./v2/routes/*js', './v2/sequelize/models/*js'],
};
