'use strict';
// TODO: Chek onDelete and onUpdate property
const { Op } = require('sequelize');
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
        itemCrossSales,
        attributeKeys,
        attributeValues,
        attributes,
    } = sequelize.models;

    attributeKeys.hasMany(attributeValues);
    attributeValues.belongsTo(attributeKeys);

    attributes.belongsTo(attributeKeys);
    attributes.belongsTo(attributeValues);
    attributes.belongsTo(items);

    items.belongsTo(brands);
    items.hasMany(barcodes);
    items.hasMany(prices);
    items.belongsToMany(units, { through: itemUnits });
    items.hasMany(stocks);

    brands.hasMany(items);

    itemUnits.hasMany(barcodes);
    itemUnits.belongsTo(items);
    itemUnits.belongsTo(units);

    stocks.belongsTo(warehouses, {
        foreignKey: 'warehouseNr',
        targetKey: 'nr',
    });

    stocks.belongsTo(items);

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

    // items.hasMany(items, {
    //     as: 'variations',
    //     foreignKey: 'variationCode',
    //     sourceKey: 'variationCode',
    // });

    items.belongsToMany(items, {
        as: 'crossSales',
        through: 'itemCrossSales',
        foreignKey: 'crossSaleItemId',
        otherKey: 'itemId',
    });

    // items.belongsToMany(items, {
    //     as: 'crossSale',
    //     through: 'crossSales',
    //     foreignKey: 'itemId',
    // });
}

module.exports = { applyExtraSetup };
