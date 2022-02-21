'use strict';

/**
 *
 * @param {int} firmNr
 * @returns currencies query
 *
 */
module.exports = (firmNr) => {
    return `SELECT 
                CURRENCYLIST.CURTYPE id,
                CURRENCYLIST.CURCODE code,
                CURRENCYLIST.CURNAME name,
                CURRENCYLIST.CURSYMBOL symbol,
                CURRENCYLIST.CURINUSE activelyUsed
            FROM ${process.env.DB_NAME}.dbo.L_CURRENCYLIST AS CURRENCYLIST WHERE CURRENCYLIST.FIRMNR = ${firmNr} `;
};
