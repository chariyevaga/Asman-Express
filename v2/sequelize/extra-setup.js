// TODO: Chek onDelete and onUpdate property
const { Sequelize } = require('Sequelize');
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

    brands.hasMany(items);
    items.belongsTo(brands);

    items.belongsToMany(units, { through: itemUnits });
    itemUnits.belongsTo(units);
    itemUnits.hasMany(barcodes);
    items.hasMany(stocks);
    stocks.belongsTo(warehouses, {
        foreignKey: 'warehouseNr',
        targetKey: 'nr',
    });

    items.hasMany(barcodes);

    barcodes.belongsTo(units);
    barcodes.belongsTo(itemUnits);

    items.hasMany(prices);
    prices.belongsTo(items);
    prices.belongsTo(currencies);

    // methods
    prices.lastPurchase = (where) => {
        return prices
            .findAll({
                attributes: [[sequelize.fn('max', sequelize.col('id')), 'id']],
                group: ['itemId'],
                where,
            })
            .then((priceIds) => {
                return prices
                    .findAll({
                        where: { id: priceIds.map((p) => p.id) },
                    })
                    .then((lastPurchasePrices) => lastPurchasePrices);
            });
    };
}

module.exports = { applyExtraSetup };
