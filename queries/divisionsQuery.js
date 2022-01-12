'use strict';

/**
 *
 * @param {string} firmNr
 * @returns divisions query
 *
 * WHERE EXISTS (use and)
 */

module.exports = (firmNr) => {
    return `SELECT LOGICALREF id, NR nr, NAME name
            FROM ${process.env.DB_NAME}.dbo.L_CAPIDIV DIV
            WHERE DIV.FIRMNR =  ${firmNr}`;
};
