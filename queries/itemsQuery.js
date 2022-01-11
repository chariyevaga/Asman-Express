'use strict';

/**
 *
 * @param {string} firmDBname
 * @param {string} firmTigerFormat
 * @returns item query
 *
 * WHERE EXISTS (use and)
 */
module.exports = (firmDBname, firmTigerFormat) => {
    return `SELECT
                ITM.LOGICALREF id, 
                ITM.CODE code, 
                ITM.B2CCODE eCode, 
                CASE WHEN ITM.ACTIVE = 0 THEN 1 ELSE 0 END active, 
                -- ITM.CARDTYPE cardType,
                ITM.NAME name, 
                ITM.NAME2 name2, 
                ITM.NAME3 name3, 
                ITM.STGRPCODE stgrpCode, 
                ITM.SPECODE specode, 
                ITM.SPECODE2 specode2, 
                ITM.SPECODE3 specode3, 
                ITM.SPECODE4 specode4, 
                ITM.SPECODE5 specode5,
                UL.NAME mainUnit,
                UL.LOGICALREF mainUnitId,
                CASE WHEN ITM.EXTACCESSFLAGS IN(4,5,6,7) THEN 1 ELSE 0 END eActive,
                MR.LOGICALREF brandId,
                ISNULL(MK.SUBSGOODCODE,'') subsGoodCode
                -- ,NULLIF(MK.REYONCODE,'') reyonCode
            FROM
                ${firmDBname}.dbo.LG_${firmTigerFormat}_ITEMS ITM
                LEFT JOIN ${firmDBname}.dbo.LG_${firmTigerFormat}_UNITSETL UL ON UL.UNITSETREF = ITM.UNITSETREF AND UL.MAINUNIT = 1
                LEFT JOIN ${firmDBname}.dbo.LG_${firmTigerFormat}_MARKET MK ON MK.ITEMREF = ITM.LOGICALREF
                LEFT JOIN ${firmDBname}.dbo.LG_${firmTigerFormat}_MARK MR ON MR.LOGICALREF = ITM.MARKREF
            WHERE ITM.CARDTYPE = 1 AND ITM.SPECODE NOT IN('ALT GRUP', 'ANA GRUP') `;
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
