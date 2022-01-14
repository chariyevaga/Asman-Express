'use strict';
/**
 *
 * @param {string} firmDBname
 * @param {string} firmTigerFormat
 * @returns itemUnits Query
 *
 */
module.exports = (firmDBname, firmTigerFormat) => {
    return `SELECT
                ITMUNITA.LOGICALREF id,
                UNITSETL.LOGICALREF unitId,
                ITMUNITA.ITEMREF itemId,
                UNITSETL.MAINUNIT mainUnit,
                ITMUNITA.LINENR lineNr,
                ITMUNITA.CONVFACT2 / CASE WHEN ISNULL(ITMUNITA.CONVFACT1,0) = 0 THEN 1 ELSE ITMUNITA.CONVFACT1 END  coefficient,
                ITMUNITA.CONVFACT1 convfact1, ITMUNITA.CONVFACT2 convfact2,
                CASE WHEN ITMUNITA.EXTACCESSFLAGS IN(1,3) THEN 1 ELSE 0 END eActive,
                ITMUNITA.WIDTH width_,
                NULLIF(ITMUNITA.WIDTHREF,0) widthId,
                ITMUNITA.LENGTH length_,
                NULLIF(ITMUNITA.LENGTHREF,0) lengthId,
                ITMUNITA.HEIGHT height_,
                NULLIF(ITMUNITA.HEIGHTREF,0) heightId,
                ITMUNITA.AREA area_,
                NULLIF(ITMUNITA.AREAREF,0) areaId,
                ITMUNITA.VOLUME_ volume_,
                NULLIF(ITMUNITA.VOLUMEREF,0) volumeId,
                ITMUNITA.WEIGHT weight_,
                NULLIF(ITMUNITA.WEIGHTREF,0) weightId,
                ITMUNITA.GROSSVOLUME grossvolume_,
                NULLIF(ITMUNITA.GROSSVOLREF,0) grossvolumeId,
                ITMUNITA.GROSSWEIGHT grossweight_,
                NULLIF(ITMUNITA.GROSSWGHTREF,0) grossweightId
            FROM
                ${firmDBname}.dbo.LG_${firmTigerFormat}_ITMUNITA ITMUNITA
                LEFT JOIN ${firmDBname}.dbo.LG_${firmTigerFormat}_UNITSETL UNITSETL ON UNITSETL.LOGICALREF = ITMUNITA.UNITLINEREF
            WHERE
                UNITSETL.LOGICALREF IS NOT NULL AND ITMUNITA.ITEMREF IS NOT NULL `;
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
