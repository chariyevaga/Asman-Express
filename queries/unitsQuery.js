'use strict';

/**
 *
 * @param {string} firmDBname
 * @param {string} firmTigerFormat
 * @returns Units Query
 *
 * WHERE NOT EXISTS
 */
module.exports = (firmDBname, firmTigerFormat) => {
    return `SELECT
                LOGICALREF id,
                CODE code,
                NAME name,
                GLOBALCODE globalCode
            FROM  ${firmDBname}.dbo.LG_${firmTigerFormat}_UNITSETL `;
};
