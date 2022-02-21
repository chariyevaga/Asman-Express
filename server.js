'use strict';
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, 'config', '.env') });

const app = require('./app');
const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    }
    console.log(
        `App  is running on port ${PORT}, NODE_ENV:${process.env?.NODE_ENV}`
    );
});
