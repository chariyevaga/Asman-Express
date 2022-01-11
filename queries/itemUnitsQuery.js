'use strict';
/**
 *
 * @param {string} firmDBname
 * @param {string} firmTigerFormat
 * @returns itemUnits Query
 *
 * WHERE EXISTS (use and)
 */
module.exports = (firmDBname, firmTigerFormat) => {
    return `SELECT
                I.LOGICALREF id,
                L.LOGICALREF unitId,
                I.ITEMREF itemId,
                L.MAINUNIT mainUnit,
                I.LINENR lineNr,
                I.CONVFACT2 / CASE WHEN ISNULL(I.CONVFACT1,0) = 0 THEN 1 ELSE I.CONVFACT1 END  coefficient,
                I.CONVFACT1 convfact1, I.CONVFACT2 convfact2,
                CASE WHEN I.EXTACCESSFLAGS IN(1,3) THEN 1 ELSE 0 END eActive,
                I.WIDTH width_,
                NULLIF(I.WIDTHREF,0) widthId,
                I.LENGTH length_,
                NULLIF(I.LENGTHREF,0) lengthId,
                I.HEIGHT height_,
                NULLIF(I.HEIGHTREF,0) heightId,
                I.AREA area_,
                NULLIF(I.AREAREF,0) areaId,
                I.VOLUME_ volume_,
                NULLIF(I.VOLUMEREF,0) volumeId,
                I.WEIGHT weight_,
                NULLIF(I.WEIGHTREF,0) weightId,
                I.GROSSVOLUME grossvolume_,
                NULLIF(I.GROSSVOLREF,0) grossvolumeId,
                I.GROSSWEIGHT grossweight_,
                NULLIF(I.GROSSWGHTREF,0) grossweightId
            FROM
                ${firmDBname}.dbo.LG_${firmTigerFormat}_ITMUNITA I
                LEFT JOIN ${firmDBname}.dbo.LG_${firmTigerFormat}_UNITSETL L ON L.LOGICALREF = I.UNITLINEREF
            WHERE
                L.LOGICALREF IS NOT NULL AND I.ITEMREF IS NOT NULL `;
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
