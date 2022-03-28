'use strict';
// TODO: Chek onDelete and onUpdate property

function applyExtraSetup(sequelize) {
    const {
        brands,
        units,
        itemUnits,
        items,
        stocks,
        barcodes,
        prices,
        currencies,
        exchanges,
        clients,
        divisions,
        warehouses,
    } = sequelize.models;

    items.belongsTo(brands);
    items.hasMany(barcodes);
    items.hasMany(prices);
    items.belongsToMany(units, { through: itemUnits });
    items.hasMany(stocks);

    brands.hasMany(items);

    itemUnits.belongsTo(units);
    itemUnits.hasMany(barcodes);

    stocks.belongsTo(warehouses, {
        foreignKey: 'warehouseNr',
        targetKey: 'nr',
    });

    barcodes.belongsTo(units);
    barcodes.belongsTo(itemUnits);
    barcodes.belongsTo(items);

    prices.belongsTo(items);
    prices.belongsTo(currencies);

    units.hasMany(barcodes);

    divisions.hasMany(warehouses, {
        foreignKey: 'divisionNr',
        sourceKey: 'nr',
    });
    warehouses.belongsTo(divisions, {
        foreignKey: 'divisionNr',
        targetKey: 'nr',
    });

    // methods
    // prices.lastPurchase = (where) => {
    //     return prices
    //         .findAll({
    //             attributes: [[sequelize.fn('max', sequelize.col('id')), 'id']],
    //             group: ['itemId'],
    //             where,
    //         })
    //         .then((priceIds) => {
    //             return prices
    //                 .findAll({
    //                     where: { id: priceIds.map((p) => p.id) },
    //                 })
    //                 .then((lastPurchasePrices) => lastPurchasePrices);
    //         });
    // };
}

module.exports = { applyExtraSetup };
