module.exports = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TIGER API',
            version: '1.0.0',
            description: '**Asman** system API documentation.',
        },
        servers: [
            {
                url: '{protocol}://{host}:{port}/api/v{version}',
                description: 'Development - localhost',
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
        // components: {
        //     securitySchemes: {
        //         bearerAuth: {
        //             type: 'http',
        //             scheme: 'basic',
        //             bearerFormat: 'JWT',
        //         },
        //     },
        // },
        // security: [
        //     {
        //         bearerAuth: [],
        //     },
        // ],
    },
    apis: ['./v2/routes/*js', './v2/sequelize/models/*js'],
};
