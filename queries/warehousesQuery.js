'use strict';

/**
 *
 * @param {int} firmNr
 * @returns warehouses query
 *
 */
module.exports = (firmNr) => {
    return `SELECT 
                CAPIWHOUSE.LOGICALREF id, 
                CAPIWHOUSE.NR nr, 
                CAPIWHOUSE.NAME name, 
                CAPIWHOUSE.DIVISNR divisionNr
            FROM ${process.env.DB_NAME}.dbo.L_CAPIWHOUSE CAPIWHOUSE
            WHERE CAPIWHOUSE.FIRMNR =  ${firmNr} `;
};
