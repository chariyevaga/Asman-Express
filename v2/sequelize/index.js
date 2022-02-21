const { applyExtraSetup } = require('./extra-setup');

const sequelize = require('../../config/db2');

const modelDefiners = [
    require('./models/brand.model'),
    require('./models/unit.model'),
    require('./models/itemUnit.model'),
    require('./models/item.model'),
    require('./models/division.model'),
    require('./models/warehouse.model'),
    require('./models/client.model'),
    require('./models/currency.model'),
    require('./models/exchange.model'),
    require('./models/stock.model'),
    // require('./models/price.model'),
    // require('./models/itemAlternative.model'),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;
