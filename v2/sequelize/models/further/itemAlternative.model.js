const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('itemAlternatives', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        alternativeItemId: {
            type: DataTypes,
            allowNull: false,
        },
    });
};
