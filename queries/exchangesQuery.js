'use strict';

/**
 *
 * @param {string} firmDBname
 * @param {string} firmTigerFormat
 * @returns Exchanges Query
 *
 */
module.exports = (firmDBname, firmTigerFormat) => {
    return `SELECT 
                EXCHANGE.LREF id,
                FORMAT(${process.env.DB_NAME}.dbo.AGO_INTTODATE(DATE_),'yyyy-MM-dd') date, 
                EXCHANGE.crtype currencyId, 
                ROUND(EXCHANGE.rates1, 10) rates1, 
                ROUND(EXCHANGE.rates2, 10) rates2, 
                ROUND(EXCHANGE.rates3, 10) rates3, 
                ROUND(EXCHANGE.rates4, 10) rates4   
            FROM ${firmDBname}..LG_EXCHANGE_${firmTigerFormat} EXCHANGE WHERE 1 = 1 `;
};
