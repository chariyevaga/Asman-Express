'use strict';

/**
 *
 * @param {int} firmNr
 * @param {string} firmDBname
 * @param {string} firmTigerFormat
 * @param {int} localCurrency
 * @returns current prices by divisions
 */
module.exports = (firmNr, firmDBname, firmTigerFormat, localCurrency) => {
    return `SELECT 
        id, itemId, divisionNr, price, beginDate, endDate, purchasePrice, createdAt, updatedAt
    FROM (
        SELECT PRICE.LOGICALREF id, ITEMS.LOGICALREF itemId, DIV.NR divisionNr, PRICE.PRICE price, ${process.env.DB_NAME}.dbo.AGO_CONVERT_TO_DATETIME(PRICE.BEGDATE, PRICE.BEGTIME) beginDate, ${process.env.DB_NAME}.dbo.AGO_CONVERT_TO_DATETIME(PRICE.ENDDATE, PRICE.ENDTIME) endDate, PURCHASE_PRICE.PRICE purchasePrice, PRICE.CAPIBLOCK_CREADEDDATE createdAt, PRICE.CAPIBLOCK_MODIFIEDDATE updatedAt, ROW_NUMBER() OVER(PARTITION BY ITEMS.LOGICALREF, DIV.NR ORDER BY PRICE.PRIORITY, PRICE.LOGICALREF DESC) PR_ROW
        FROM ${firmDBname}.dbo.LG_${firmTigerFormat}_ITEMS ITEMS
        INNER JOIN ${process.env.DB_NAME}.dbo.L_CAPIDIV DIV ON DIV.FIRMNR = ${firmNr} AND DIV.NR <> 0
        LEFT JOIN ${firmDBname}.dbo.LG_${firmTigerFormat}_PRCLIST PRICE ON PRICE.CARDREF = ITEMS.LOGICALREF
                                          AND GETDATE() BETWEEN ${process.env.DB_NAME}.dbo.AGO_CONVERT_TO_DATETIME(PRICE.BEGDATE, PRICE.BEGTIME) AND ${process.env.DB_NAME}.dbo.AGO_CONVERT_TO_DATETIME(PRICE.ENDDATE, PRICE.ENDTIME)
                                          AND PRICE.ACTIVE = 0 
                                          AND PRICE.PTYPE = 2
                                          AND PRICE.CLSPECODE = ''
                                          AND PRICE.CLSPECODE2 = ''
                                          AND PRICE.CLSPECODE3 = ''
                                          AND PRICE.CLSPECODE4 = ''
                                          AND PRICE.CLSPECODE5 = ''
                                          AND PRICE.CLCYPHCODE = ''
                                          AND PRICE.CLIENTCODE = ''
                                          AND (PRICE.CURRENCY = ${localCurrency} OR PRICE.CURRENCY = 0)
        JOIN ${firmDBname}.dbo.LG_${firmTigerFormat}_PRCLSTDIV PRDIV ON PRDIV.PARENTPRCREF = PRICE.LOGICALREF AND (PRDIV.DIVCODES = '-1' OR PRDIV.DIVCODES LIKE CONCAT('%', RIGHT(CONCAT('000',DIV.NR),4),'%'))
        JOIN ${firmDBname}.dbo.LG_${firmTigerFormat}_UNITSETL UNIT ON (UNIT.LOGICALREF = PRICE.UOMREF AND UNIT.MAINUNIT = 1) -- OR PRICE.UOMREF = 0
        LEFT JOIN (
            SELECT PPRICE.CARDREF, PRICE, ROW_NUMBER() OVER(PARTITION BY PPRICE.CARDREF ORDER BY PPRICE.LOGICALREF DESC) ROW_PPRICE FROM ${firmDBname}.dbo.LG_${firmTigerFormat}_PRCLIST PPRICE
            JOIN ${firmDBname}.dbo.LG_${firmTigerFormat}_UNITSETL UNIT ON (UNIT.LOGICALREF = PPRICE.UOMREF AND UNIT.MAINUNIT = 1) -- OR PPRICE.UOMREF = 0
            WHERE GETDATE() BETWEEN ${process.env.DB_NAME}.dbo.AGO_CONVERT_TO_DATETIME(PPRICE.BEGDATE, PPRICE.BEGTIME) AND ${process.env.DB_NAME}.dbo.AGO_CONVERT_TO_DATETIME(PPRICE.ENDDATE, PPRICE.ENDTIME)
                  AND PPRICE.ACTIVE = 0 
                  AND PPRICE.PTYPE = 1
                  AND (PPRICE.CURRENCY = ${localCurrency} OR PPRICE.CURRENCY = 0)
            ) AS PURCHASE_PRICE ON PURCHASE_PRICE.CARDREF = ITEMS.LOGICALREF AND PURCHASE_PRICE.ROW_PPRICE = 1
    )
    ASDF
    WHERE PR_ROW = 1 `;
};
