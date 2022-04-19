'use strict';
const AppError = require('../../utils/appError');
const { Op, Sequelize } = require('sequelize');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const request = require('request');
const getTigerToken = require('../../utils/getTigerToken');

const createNewSale = async (req, res, next, tryCount = 5) => {
    const ficheBody = req.body;
    if (!Object.keys(ficheBody)?.length) {
        next(new AppError('Sale Fiche body is required', 400));
        return;
    }
    const exchangeRDobj = await req.models.exchanges.findOne({
        where: {
            currencyId: req.reportCurrency, //? req.reportCurrency : 1,
            date: {
                [Op.lte]: Sequelize.fn('GETDATE'),
            },
            rates1: {
                [Op.ne]: 0,
            },
        },
        order: [['date', 'desc']],
        attributes: ['rates1'],
    });
    const exchangeRD =
        Object.keys(exchangeRDobj).length && exchangeRDobj?.rates1
            ? exchangeRDobj?.rates1
            : 1;
    // res.json(exchangeRD);
    const ficheDate = new Date(ficheBody.date);
    const tigerJSON = {
        NUMBER: ficheBody?.code,
        DATE: ficheBody?.date,
        TIME:
            ficheDate?.getHours() * 65536 * 256 +
            ficheDate?.getMinutes() * 65536 +
            ficheDate?.getSeconds() * 256, //(@HH * 65536 * 256 + @MM * 65536 + @SS * 256)
        ARP_CODE: ficheBody?.clientCode,
        DIVISION: ficheBody?.divisionNr,
        SOURCE_WH: ficheBody?.warehouseNr,
        SOURCE_COST_GRP: ficheBody?.warehouseNr,
        SALESMAN_CODE: ficheBody?.employeeCode,
        DOC_NUMBER: ficheBody?.docNumber,
        DOC_TRACK_NR: ficheBody?.docTrack,
        PROJECT_CODE: ficheBody?.projectCode,
        NOTES1: ficheBody?.note1,
        NOTES2: ficheBody?.note2,
        NOTES3: ficheBody?.note3,
        NOTES4: ficheBody?.note4,
        NOTES5: ficheBody?.note5,
        NOTES6: ficheBody?.note6,
        ITEXT: ficheBody?.text,
        AUXIL_CODE: ficheBody?.specode,
        DOC_DATE: new Date(),
        TYPE: 8,
        GRPCODE: 2,
        VAT_RATE: 0,
        AFFECT_RISK: 1,
        CURRSEL_DETAILS: 4,
        CURRSEL_TOTALS: 1,
        // CURR_TRANSACTIN: 158,
        // CURRSEL_TOTAL: 158,
        // TC_RATE: 1,
        RC_XRATE: exchangeRD,
        ORDER_STATUS: 1,
        POST_FLAGS: 247, // name bilemok
        TRANSACTIONS: {
            items: [],
        },
    };

    if (ficheBody?.lines.length) {
        tigerJSON.TRANSACTIONS.items = ficheBody?.lines.map((line) => {
            if (line?.type === 0) {
                //items
                return {
                    TYPE: 0,
                    MASTER_CODE: line.code,
                    QUANTITY: line.quantity,
                    UNIT_CODE: line.unitCode,
                    PC_PRICE: line.price,
                    CURR_PRICE: line.priceCurrencyId,
                    // fiyatin yerel bire gore rate
                    PR_RATE: line.priceCurrencyRate,
                    // Raporlama dovuz kuru
                    RC_XRATE: exchangeRD,
                    DATE: ficheBody?.date,
                    SOURCEINDEX: ficheBody?.warehouseNr,
                    SOURCECOSTGRP: ficheBody?.warehouseNr,
                    TRANS_DESCRIPTION: line.description,
                    TRCODE: 8,
                };
            } else if (line?.type === 1) {
                // promotion
                return {
                    TYPE: 1,
                    MASTER_CODE: line.code,
                    QUANTITY: line.quantity,
                    UNIT_CODE: line.unitCode,
                    PC_PRICE: line.price,
                    CURR_PRICE: line.priceCurrencyId,
                    PR_RATE: line.priceCurrencyRate,
                    RC_XRATE: exchangeRD,
                    DATE: ficheBody?.date,
                    SOURCEINDEX: ficheBody?.warehouseNr,
                    SOURCECOSTGRP: ficheBody?.warehouseNr,
                    TRANS_DESCRIPTION: line.description,
                    DISCOUNT_RATE: 100,
                    TRCODE: 8,
                };
            } else if (line?.type === 2) {
                return {
                    TYPE: 2,
                    MASTER_CODE: line.code,
                    TRANS_DESCRIPTION: line.description,
                    PR_RATE: 1,
                    RC_XRATE: exchangeRD,
                    TRCODE: 8,
                    DISCOUNT_RATE: line.discount,
                    SOURCEINDEX: ficheBody?.warehouseNr,
                    SOURCECOSTGRP: ficheBody?.warehouseNr,
                };
            } else if (line?.type === 3) {
                // Expenses
                return {
                    TYPE: 3,
                    MASTER_CODE: line.code,
                    TRANS_DESCRIPTION: line.description,
                    PR_RATE: 1,
                    RC_XRATE: exchangeRD,
                    TRCODE: 8,
                    DISCOUNT_RATE: line.expenseRate,
                    SOURCEINDEX: ficheBody?.warehouseNr,
                    SOURCECOSTGRP: ficheBody?.warehouseNr,
                };
            } else if (line?.type === 4) {
                // Services
                return {
                    TYPE: 4,
                    MASTER_CODE: line.code,
                    QUANTITY: line.quantity,
                    UNIT_CODE: line.unitCode,
                    PC_PRICE: line.price,
                    CURR_PRICE: line.priceCurrencyId,
                    PR_RATE: line.priceCurrencyRate,
                    RC_XRATE: exchangeRD,
                    DATE: ficheBody?.date,
                    SOURCEINDEX: ficheBody?.warehouseNr,
                    SOURCECOSTGRP: ficheBody?.warehouseNr,
                    TRANS_DESCRIPTION: line.description,
                    TRCODE: 8,
                };
            }
        });

        ficheBody?.underLines.forEach((line) => {
            if (line?.type === 1) {
                // promotion
                tigerJSON.TRANSACTIONS.items.push({
                    TYPE: 1,
                    MASTER_CODE: line.code,
                    QUANTITY: line.quantity,
                    UNIT_CODE: line.unitCode,
                    PC_PRICE: line.price,
                    CURR_PRICE: line.priceCurrencyId,
                    PR_RATE: line.priceCurrencyRate,
                    RC_XRATE: exchangeRD,
                    DATE: ficheBody?.date,
                    SOURCEINDEX: ficheBody?.warehouseNr,
                    SOURCECOSTGRP: ficheBody?.warehouseNr,
                    TRANS_DESCRIPTION: line.description,
                    DISCOUNT_RATE: 100,
                    TRCODE: 8,
                    DETAIL_LEVEL: 1,
                });
            } else if (line?.type === 2) {
                // discount
                tigerJSON.TRANSACTIONS.items.push({
                    TYPE: 2,
                    MASTER_CODE: line.code,
                    TRANS_DESCRIPTION: line.description,
                    PR_RATE: 1,
                    RC_XRATE: exchangeRD,
                    TRCODE: 8,
                    DISCOUNT_RATE: line.discount,
                    DETAIL_LEVEL: 1,
                    SOURCEINDEX: ficheBody?.warehouseNr,
                    SOURCECOSTGRP: ficheBody?.warehouseNr,
                });
            } else if (line?.type === 3) {
                // Expenses
                tigerJSON.TRANSACTIONS.items.push({
                    TYPE: 3,
                    MASTER_CODE: line.code,
                    TRANS_DESCRIPTION: line.description,
                    PR_RATE: 1,
                    RC_XRATE: exchangeRD,
                    TRCODE: 8,
                    DISCOUNT_RATE: line.expenseRate,
                    DETAIL_LEVEL: 1,
                    SOURCEINDEX: ficheBody?.warehouseNr,
                    SOURCECOSTGRP: ficheBody?.warehouseNr,
                });
            }
            // else if (line?.type === 4) {
            //     // Services
            //     tigerJSON.TRANSACTIONS.items.push({
            //         TYPE: 11,
            //         MASTER_CODE: line.code,
            //         QUANTITY: line.quantity,
            //         UNIT_CODE: line.unitCode,
            //         PC_PRICE: line.price,
            //         CURR_PRICE: line.priceCurrencyId,
            //         PR_RATE: line.priceCurrencyRate,
            //         RC_XRATE: exchangeRD,
            //         DATE: ficheBody?.date,
            //         SOURCEINDEX: ficheBody?.warehouseNr,
            //         SOURCECOSTGRP: ficheBody?.warehouseNr,
            //         TRANS_DESCRIPTION: line.description,
            //         TRCODE: 8,
            //         DETAIL_LEVEL: 1,
            //     });
            // }
        });
    } else {
        next(new AppError('Fiche Lines is required', 400));
        return;
    }

    // res.json(tigerJSON.TRANSACTIONS.items)push(

    await request(
        {
            method: 'POST',
            url: `${process.env.TIGER_REST_URL}/salesInvoices`,
            headers: {
                Authorization: `Bearer ${global.TIGER_TOKEN[req.firmNr]}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(tigerJSON),
        },
        async function (error, response) {
            if (error) {
                next(new AppError(error, 500));
            } else {
                if (response?.statusCode === 200) {
                    res.status(200).json(JSON.parse(response.body));
                    return;
                } else if (response?.statusMessage === 'Unauthorized') {
                    global.TIGER_TOKEN[req.firmNr] = await getTigerToken(
                        req.firmNr
                    );
                    if (tryCount <= 5) {
                        await delay(2000);
                        createNewSale(req, res, next, tryCount);
                    } else {
                        next(new AppError("Can't get tiger tokken", 500));
                        return;
                    }
                } else {
                    res.status(400).json(JSON.parse(response.body));
                }
            }
        }
    );
};

module.exports = { createNewSale };
