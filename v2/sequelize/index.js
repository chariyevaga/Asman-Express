const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

const sequelize = require('../../config/db2');

const modelDefiners = [
    // require('./models/item.model'),
    // require('./models/itemImage.model'),
    // require('./models/unit.model'),
    // require('./models/itemUnit.model'),
    require('./models/brand.model'),
    // require('./models/mainGroup.model'),
    // require('./models/lastGroup.model'),
    // require('./models/banner.model'),
    // require('./models/division.model'),
    // require('./models/warehouse.model'),
    // require('./models/employee.model'),
    // require('./models/employeeLoginLog.model'),
    // require('./models/itemAlternative.model'),
    // require('./models/stock.model'),
    // require('./models/client.model'),
    // require('./models/syncSchedule.model'),
    // require('./models/syncHistory.model'),
    // require('./models/clientComment.model'),
    // require('./models/employeeCommentOnClient.model'),
    // require('./models/discountExpenseCard.model'),
    // require('./models/serviceCard.model'),
    // require('./models/currency.model'),
    // require('./models/price.model'),
    // require('./models/exchange.model'),
    // require('./models/device.model'),
    // require('./models/discount.model'),
    // require('./models/discountMaster.model'),
    // require('./models/favourite.model'),
    // require('./models/cart.model'),
    // require('./models/smartSection.model'),
    // require('./models/bannerLog.model'),
    // require('./models/smartSectionLog.model'),
    // require('./models/itemLog.model'),

    // require('./models/tigerEmployee.model'),

    // require('./models/mainGroupLog.model'),
    // require('./models/lastGroupLog.model'),
    // require('./models/brandLog.model'),
    // require('./models/order.model'),
    // require('./models/orderItem.model'),
    // require('./models/orderLog.model'),
    // require('./models/search.model'),
    // require('./models/feedback.model'),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;
