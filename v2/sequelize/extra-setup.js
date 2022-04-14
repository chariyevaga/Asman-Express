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
        divisions,
        warehouses,
        attributeKeys,
        attributeValues,
        attributes,
        banks,
        bankAccounts,
        cases,
        itemAlternatives,
        unitSets,
    } = sequelize.models;

    units.belongsTo(unitSets);
    unitSets.hasMany(units);

    banks.hasMany(bankAccounts);
    bankAccounts.belongsTo(banks);
    bankAccounts.belongsTo(currencies);
    cases.belongsTo(currencies);
    cases.belongsTo(divisions, {
        foreignKey: 'divisionNr',
        targetKey: 'nr',
    });

    attributeKeys.hasMany(attributeValues);
    attributeValues.belongsTo(attributeKeys);

    attributes.belongsTo(attributeKeys);
    attributes.belongsTo(attributeValues);
    attributes.belongsTo(items);
    items.hasMany(attributes);

    exchanges.belongsTo(currencies);
    currencies.hasMany(exchanges);

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
    prices.belongsTo(units);

    units.hasMany(barcodes);

    divisions.hasMany(warehouses, {
        foreignKey: 'divisionNr',
        sourceKey: 'nr',
    });

    warehouses.belongsTo(divisions, {
        foreignKey: 'divisionNr',
        targetKey: 'nr',
    });

    itemAlternatives.belongsTo(items);
    itemAlternatives.belongsTo(items, {
        as: 'alternative',
        foreignKey: 'alternativeItemId',
        sourceKey: 'itemId',
    });

    items.belongsToMany(items, {
        as: 'alternatives',
        through: itemAlternatives,
        foreignKey: 'itemId',
        otherKey: 'alternativeItemId',
    });
}

module.exports = { applyExtraSetup };
