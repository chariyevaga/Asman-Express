'use strict';

/**
 *
 * @param {string} firmDBname
 * @param {string} firmTigerFormat
 * @returns Barcodes Query
 *
 */
module.exports = (firmDBname, firmTigerFormat, filtre) => {
    return `SELECT 
                UNITBARCODE.LOGICALREF id, 
                UNITBARCODE.BARCODE barcode,
                UNITBARCODE.ITMUNITAREF itemUnitId, 
                UNITBARCODE.ITEMREF itemId, 
                UNITBARCODE.UNITLINEREF unitId, 
                UNITBARCODE.LINENR lineNr, 
                UNITBARCODE.CAPIBLOCK_CREADEDDATE createdAt, 
                UNITBARCODE.CAPIBLOCK_MODIFIEDDATE updatedAt 
            FROM ${firmDBname}.dbo.LG_${firmTigerFormat}_UNITBARCODE as UNITBARCODE WHERE 1 = 1 `;
};
