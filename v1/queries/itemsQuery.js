'use strict';

/**
 *
 * @param {string} firmDBname
 * @param {string} firmTigerFormat
 * @returns item query
 *
 */
module.exports = (firmDBname, firmTigerFormat) => {
    return `SELECT
                ITEMS.LOGICALREF id, 
                ITEMS.CODE code, 
                ITEMS.B2CCODE eCode, 
                CASE WHEN ITEMS.ACTIVE = 0 THEN 1 ELSE 0 END active, 
                -- ITEMS.CARDTYPE cardType,
                ITEMS.NAME name, 
                ITEMS.NAME2 name2, 
                ITEMS.NAME3 name3, 
                ITEMS.STGRPCODE stgrpCode, 
                ITEMS.SPECODE specode, 
                ITEMS.SPECODE2 specode2, 
                ITEMS.SPECODE3 specode3, 
                ITEMS.SPECODE4 specode4, 
                ITEMS.SPECODE5 specode5,
                UNITSETL.NAME mainUnit,
                UNITSETL.LOGICALREF mainUnitId,
                CASE WHEN ITEMS.EXTACCESSFLAGS IN(4,5,6,7) THEN 1 ELSE 0 END eActive,
                MARK.LOGICALREF brandId,
                ISNULL(MARKET.SUBSGOODCODE,'') subsGoodCode
                -- ,NULLIF(MARKET.REYONCODE,'') reyonCode
            FROM
                ${firmDBname}.dbo.LG_${firmTigerFormat}_ITEMS ITEMS
                LEFT JOIN ${firmDBname}.dbo.LG_${firmTigerFormat}_UNITSETL UNITSETL ON UNITSETL.UNITSETREF = ITEMS.UNITSETREF AND UNITSETL.MAINUNIT = 1
                LEFT JOIN ${firmDBname}.dbo.LG_${firmTigerFormat}_MARKET MARKET ON MARKET.ITEMREF = ITEMS.LOGICALREF
                LEFT JOIN ${firmDBname}.dbo.LG_${firmTigerFormat}_MARK MARK ON MARK.LOGICALREF = ITEMS.MARKREF
            WHERE ITEMS.CARDTYPE = 1 AND ITEMS.SPECODE NOT IN('ALT GRUP', 'ANA GRUP') `;
};
/*
    1 : Ticari mal
    2 : Karma koli
    3 : Depozitolu mal
    4 : Sabit kıymet
    10 : Hammadde
    11 : Yarımamul
    12 : Mamul
    13 : Tükletim malı
    20 : M.sınıfı (genel)
    21 : M.sınıfı (tablolu)
    22 : Firma dosyaları oluşturulurken default olarak eklenen malzeme sınıfı

*/
