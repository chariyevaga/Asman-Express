// TODO: Chek onDelete and onUpdate property
function applyExtraSetup(sequelize) {
    const {
        // items,
        // itemAlternatives,
        brands,
        // units,
        // itemUnit,
        // itemImages,
        // mainGroups,
        // lastGroups,
        // banners,
        // employees,
        // employeeLoginLogs,
        // clients,
        // employeeCommentOnClients,
        // divisions,
        // stocks,
        // warehouses,
        // currencies,
        // prices,
        // devices,
        // syncHistories,
        // syncSchedules,
        // exchanges,
        // favourites,
        // bannerLogs,
        // brandLogs,
        // mainGroupLogs,
        // lastGroupLogs,
        // smartSectionLogs,
        // itemLogs,
        // carts,
        // tigerEmployees,
        // orders,
        // orderLogs,
        // orderItems,
        // feedbacks,
    } = sequelize.models;

    //     syncSchedules.hasMany(syncHistories);
    //     syncHistories.belongsTo(syncSchedules);

    //     mainGroups.hasMany(lastGroups);
    //     lastGroups.belongsTo(mainGroups, {
    //         foreignKey: { name: 'mainGroupId', allowNull: true },
    //     });

    //     mainGroups.hasMany(items);
    //     items.belongsTo(mainGroups, {
    //         foreignKey: { name: 'mainGroupId', allowNull: true },
    //     });

    //     lastGroups.hasMany(items);
    //     items.belongsTo(lastGroups, {
    //         foreignKey: { name: 'lastGroupId', allowNull: true },
    //     });

    //     items.hasMany(itemUnit, { as: 'units', foreignKey: 'itemId' });
    //     itemUnit.belongsTo(items);

    //     // divisions.hasMany(warehouses, { foreignKey: 'warehouses' });

    //     units.hasMany(itemUnit);
    //     itemUnit.belongsTo(units, { as: 'info', foreignKey: 'unitId' });

    //     items.hasMany(itemImages, { as: 'images' });
    //     itemImages.belongsTo(items);

    //     // unitlar ucin
    //     itemUnit.belongsTo(units, { as: 'width', foreignKey: 'widthId' });
    //     itemUnit.belongsTo(units, { as: 'length', foreignKey: 'lengthId' });
    //     itemUnit.belongsTo(units, { as: 'height', foreignKey: 'heightId' });
    //     itemUnit.belongsTo(units, { as: 'area', foreignKey: 'areaId' });
    //     itemUnit.belongsTo(units, { as: 'volume', foreignKey: 'volumeId' });
    //     itemUnit.belongsTo(units, { as: 'weight', foreignKey: 'weightId' });
    //     itemUnit.belongsTo(units, {
    //         as: 'grossvolume',
    //         foreignKey: 'grossvolumeId',
    //     });
    //     itemUnit.belongsTo(units, {
    //         as: 'grossweight',
    //         foreignKey: 'grossweightId',
    //     });

    //     // items.hasMany(itemAlternatives, { as: 'alternatives' });

    //     // itemAlternatives.belongsTo(items, {
    //     //     foreignKey: 'alternativeItemId',
    //     // });

    //     items.belongsToMany(items, {
    //         as: 'alternatives',
    //         through: itemAlternatives,
    //         foreignKey: 'alternativeItemId',
    //     });

    //     items.belongsToMany(items, {
    //         as: 'item',
    //         through: itemAlternatives,
    //         foreignKey: 'itemId',
    //     });

    //     brands.hasMany(items);
    //     items.belongsTo(brands, {
    //         foreignKey: { name: 'brandId', allowNull: true },
    //     });

    //     employees.hasMany(employeeLoginLogs);

    //     items.hasMany(stocks);
    //     stocks.belongsTo(items);

    //     stocks.belongsTo(warehouses, {
    //         foreignKey: 'warehouseNr',
    //         targetKey: 'nr',
    //     });

    //     // warehouses.hasMany(stocks, { foreignKey: 'nr' });

    //     employees.hasMany(employeeCommentOnClients, { as: 'comments' });
    //     employeeCommentOnClients.belongsTo(employees);

    //     clients.hasMany(employeeCommentOnClients, { as: 'comments' });
    //     employeeCommentOnClients.belongsTo(clients);

    //     employeeCommentOnClients.belongsTo(employees);

    //     divisions.hasOne(clients);

    //     clients.belongsTo(divisions);

    //     clients.hasMany(devices);
    //     devices.belongsTo(clients);

    //     clients.belongsTo(currencies);
    //     items.hasMany(prices);

    //     currencies.hasMany(exchanges);
    //     exchanges.belongsTo(currencies);

    //     items.hasMany(favourites);
    //     devices.hasMany(favourites);

    //     favourites.belongsTo(items);
    //     favourites.belongsTo(devices);

    //     items.hasMany(carts);
    //     devices.hasMany(carts);

    //     carts.belongsTo(items);
    //     carts.belongsTo(devices);

    //     banners.hasMany(bannerLogs);
    //     bannerLogs.belongsTo(banners);

    //     banners.hasMany(smartSectionLogs);
    //     smartSectionLogs.belongsTo(banners);

    //     employees.belongsTo(tigerEmployees);
    //     tigerEmployees.hasOne(employees);

    //     brands.hasMany(brandLogs);
    //     brandLogs.belongsTo(brands);

    //     mainGroups.hasMany(mainGroupLogs);
    //     mainGroupLogs.belongsTo(mainGroups);

    //     lastGroups.hasMany(lastGroupLogs);
    //     lastGroupLogs.belongsTo(lastGroups);

    //     items.hasMany(itemLogs);
    //     itemLogs.belongsTo(items);

    //     orders.hasMany(orderLogs);
    //     orders.hasMany(orderItems);

    //     orders.belongsTo(employees, { allowNull: null });
    //     orders.belongsTo(clients, { allowNull: null });
    //     orders.belongsTo(devices, { allowNull: null });
    //     orders.belongsTo(divisions, { allowNull: null });

    //     feedbacks.belongsTo(clients, { allowNull: null });
    //     feedbacks.belongsTo(devices, { allowNull: null });
    //     feedbacks.belongsTo(employees, { allowNull: null });
}

module.exports = { applyExtraSetup };
