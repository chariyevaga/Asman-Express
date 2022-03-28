'use strict';
const dotenv = require('dotenv');
const path = require('path');
const https = require('https');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, 'config', '.env') });

const app = require('./app');
const PORT = process.env.PORT;

const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },
    app
);

sslServer.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    }
    console.log(
        `App  is running on port ${PORT}, NODE_ENV:${process.env?.NODE_ENV}`
    );
});
