const { Sequelize, Model, DataTypes, Op } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define(
        'units',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            code: {
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
            },
            codeTm: {
                type: DataTypes.STRING,
            },
            codeTr: {
                type: DataTypes.STRING,
            },
            codeRu: {
                type: DataTypes.STRING,
            },
            codeEng: {
                type: DataTypes.STRING,
            },
            nameTm: {
                type: DataTypes.STRING,
            },
            nameTr: {
                type: DataTypes.STRING,
            },
            nameRu: {
                type: DataTypes.STRING,
            },
            nameEng: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
        }
    );
};
