'use strict';

/**
 *
 * @param {string} firmDBname
 * @param {string} firmTigerFormat
 * @param {int} localCurrency
 * @returns all prices
 */
module.exports = (firmDBname, firmTigerFormat, localCurrency) => {
    return `
        SELECT
            PRICE.LOGICALREF id,
            PRICE.CARDREF itemId,
            PRICE.PRICE price,
            ${process.env.DB_NAME}.dbo.AGO_CONVERT_TO_DATETIME(PRICE.BEGDATE, PRICE.BEGTIME) beginDate, 
            ${process.env.DB_NAME}.dbo.AGO_CONVERT_TO_DATETIME(PRICE.ENDDATE, PRICE.ENDTIME) endDate, 
            CASE WHEN PRICE.PTYPE = 1 THEN 'purchasePrice'
                 ELSE 'sellingPrice' END type,
            PRICE.CAPIBLOCK_CREADEDDATE createdAt, 
            PRICE.CAPIBLOCK_MODIFIEDDATE updatedAt,
            CASE WHEN PRICE.ACTIVE = 0  THEN 1 ELSE 0 END active,
            PRICE.UOMREF unitId,
            NULLIF(PRDIV.DIVCODES,'-1') divisions
        FROM ${firmDBname}.dbo.LG_${firmTigerFormat}_ITEMS ITEMS
        JOIN ${firmDBname}.dbo.LG_${firmTigerFormat}_PRCLIST PRICE ON PRICE.CARDREF = ITEMS.LOGICALREF
                                          AND PRICE.CLSPECODE = ''
                                          AND PRICE.CLSPECODE2 = ''
                                          AND PRICE.CLSPECODE3 = ''
                                          AND PRICE.CLSPECODE4 = ''
                                          AND PRICE.CLSPECODE5 = ''
                                          AND PRICE.CLCYPHCODE = ''
                                          AND PRICE.CLIENTCODE = ''
                                          AND (PRICE.CURRENCY = ${localCurrency} OR PRICE.CURRENCY = 0)
        LEFT JOIN ${firmDBname}.dbo.LG_${firmTigerFormat}_PRCLSTDIV PRDIV ON PRDIV.PARENTPRCREF = PRICE.LOGICALREF
        WHERE 1 = 1 `;
};
