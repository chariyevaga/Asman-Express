'use strict';

/**
 *
 * @param {string} firmNr
 * @returns divisions query
 *
 */

module.exports = (firmNr) => {
    return `SELECT 
                CAPIDIV.LOGICALREF id, 
                CAPIDIV.NR nr, 
                CAPIDIV.NAME name
            FROM ${process.env.DB_NAME}.dbo.L_CAPIDIV CAPIDIV
            WHERE CAPIDIV.FIRMNR =  ${firmNr} `;
};
