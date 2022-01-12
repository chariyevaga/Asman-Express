'use strict';

/**
 *
 * @param {int} firmNr
 * @returns currencies query
 *
 * WHERE EXISTS (use and)
 */
module.exports = (firmNr) => {
    return `SELECT 
                CURTYPE id,
                CURCODE code,
                CURNAME name,
                CURSYMBOL symbol,
                CURINUSE activelyUsed
            FROM ${process.env.DB_NAME}.dbo.L_CURRENCYLIST WHERE FIRMNR = ${firmNr} `;
};
