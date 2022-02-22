// TODO: Chek onDelete and onUpdate property
function applyExtraSetup(sequelize) {
    const {
        brands,
        units,
        itemUnits,
        items,
        stocks,
        barcodes,
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
}

module.exports = { applyExtraSetup };
