'use strict';

/**
 *
 * @param {int} firmNr
 * @returns stock query
 *
 */
module.exports = (firmDBname, firmTigerFormat, donemTigerFormat) => {
    return `SELECT 
                GNTOTST.STOCKREF itemId, 
                GNTOTST.INVENNO warehouseId, 
                GNTOTST.ONHAND onhand, 
                GNTOTST.RECEIVED received 
            FROM ${firmDBname}.dbo.LV_${firmTigerFormat}_01_GNTOTST GNTOTST
            WHERE GNTOTST.INVENNO <> -1 
        `;
};
