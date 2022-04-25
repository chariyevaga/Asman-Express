const request = require('request');
/**
 *  env has tiger firmNr, username and password. Using them return token
 * @returns {string} TIGER TOKEN
 */
module.exports = (firmNr) => {
    return new Promise(function (resolve, reject) {
        request(
            {
                method: 'POST',
                url: `${process.env.TIGER_REST_URL}/token`,
                headers: {
                    Authorization: `Basic ${process.env.TIGER_REST_BASIC}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: `grant_type=password&username=${process.env.TIGER_USER_NAME}&firmno=${firmNr}&password=${process.env.TIGER_USER_PASSWORD}`,
            },
            async function (error, res, body) {
                if (!error && res?.statusCode == 200) {
                    resolve(JSON.parse(body)?.access_token);
                } else {
                    reject(error + ' ' + body);
                }
            }
        );
    }).catch((error) => {
        console.error('TIGER GET TOKEN FAILED:', error);
        return false;
    });
};
