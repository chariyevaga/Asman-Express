'use strict';

/**
 *
 * @param {string} firmDBname
 * @param {string} firmTigerFormat
 * @returns Barcodes Query
 *
 * WHERE NOT EXISTS
 */
module.exports = (firmDBname, firmTigerFormat) => {
    return `SELECT 
                LOGICALREF id, 
                BARCODE barcode,
                ITMUNITAREF itemUnit, 
                ITEMREF itemId, 
                UNITLINEREF unitId, 
                LINENR lineNr, 
                CAPIBLOCK_CREADEDDATE createdAt, 
                CAPIBLOCK_MODIFIEDDATE updatedAt 
            FROM ${firmDBname}.dbo.LG_${firmTigerFormat}_UNITBARCODE `;
};
