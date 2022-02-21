// TODO: Chek onDelete and onUpdate property
function applyExtraSetup(sequelize) {
    const {
        brands,
        units,
        itemUnits,
        items,
        stocks,
        currencies,
        exchanges,
        clients,
        divisions,
        warehouses,
    } = sequelize.models;

    brands.hasMany(items);
    items.belongsTo(brands);

    items.belongsToMany(units, { through: itemUnits });

    items.hasMany(stocks);
    stocks.belongsTo(warehouses, {
        foreignKey: 'warehouseNr',
        targetKey: 'nr',
    });
}

module.exports = { applyExtraSetup };
