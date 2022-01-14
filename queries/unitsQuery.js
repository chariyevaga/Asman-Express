'use strict';

/**
 *
 * @param {string} firmDBname
 * @param {string} firmTigerFormat
 * @returns Units Query
 *
 */
module.exports = (firmDBname, firmTigerFormat) => {
    return `SELECT
                UNITSETL.LOGICALREF id,
                UNITSETL.CODE code,
                UNITSETL.NAME name,
                UNITSETL.GLOBALCODE globalCode
            FROM  ${firmDBname}.dbo.LG_${firmTigerFormat}_UNITSETL UNITSETL WHERE 1 = 1 `;
};
