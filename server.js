const dotenv = require('dotenv');
const path = require('path');

if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: path.join(__dirname, 'config', 'development.env') });
} else {
    dotenv.config({ path: path.join(__dirname, 'config', 'production.env') });
}

const app = require('./app');
const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    }
    console.log(
        `App is running on port ${PORT}, NODE_ENV:${process.env?.NODE_ENV}`
    );
});
