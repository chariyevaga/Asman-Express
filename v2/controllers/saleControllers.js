'use strict';
const AppError = require('../../utils/appError');
const { Op, Sequelize } = require('sequelize');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const request = require('request');
const getTigerToken = require('../../utils/getTigerToken');
const checkLineType = (line, ficheBody, exchangeRD, type) => {
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
            EDT_CURR: line.priceCurrencyId,
            EDT_PRICE: line.price,
            DATE: ficheBody?.date,
            DISCEXP_CALC: 1,
            SOURCEINDEX: ficheBody?.warehouseNr,
            SOURCECOSTGRP: ficheBody?.warehouseNr,
            DESCRIPTION: line.description,
            TRCODE: 8,
            BILLED: 1,
            DETAIL_LEVEL: type ? 1 : 0,
            SALEMANCODE: ficheBody?.employeeCode,
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
            // fiyatin yerel bire gore rate
            PR_RATE: line.priceCurrencyRate,
            // Raporlama dovuz kuru
            RC_XRATE: exchangeRD,
            EDT_CURR: line.priceCurrencyId,
            EDT_PRICE: line.price,
            DATE: ficheBody?.date,
            DISCEXP_CALC: 1,
            SOURCEINDEX: ficheBody?.warehouseNr,
            SOURCECOSTGRP: ficheBody?.warehouseNr,
            DESCRIPTION: line.description,
            TRCODE: 8,
            BILLED: 1,
            DETAIL_LEVEL: type ? 1 : 0,
            DISCOUNT_RATE: 100,
            SALEMANCODE: ficheBody?.employeeCode,
        };
    } else if (line?.type === 2) {
        // disocunt
        const discount = {
            TYPE: 2,
            MASTER_CODE: line.code,
            DESCRIPTION: line.description,
            RC_XRATE: exchangeRD,
            TRCODE: 8,
            SOURCEINDEX: ficheBody?.warehouseNr,
            SOURCECOSTGRP: ficheBody?.warehouseNr,
            DETAIL_LEVEL: type ? 1 : 0,
            SALEMANCODE: ficheBody?.employeeCode,
        };

        if (line?.discount?.type === 'amount') {
            // discount.CURR_PRICE = line.discount.value;
            // discount.PR_RATE = line.discountCurrencyRate;
            discount.TOTAL = line.discount.value;
            discount.DISCEXP_CALC = '1';
        } else if (line?.discount?.type === 'percentage') {
            discount.DISCOUNT_RATE = line.discount.value;
        }
        return discount;
    } else if (line?.type === 3) {
        // Expenses
        const expense = {
            TYPE: 3,
            MASTER_CODE: line.code,
            DESCRIPTION: line.description,
            RC_XRATE: exchangeRD,
            TRCODE: 8,
            SOURCEINDEX: ficheBody?.warehouseNr,
            SOURCECOSTGRP: ficheBody?.warehouseNr,
            DETAIL_LEVEL: type ? 1 : 0,
            SALEMANCODE: ficheBody?.employeeCode,
        };

        if (line?.expense?.type === 'amount') {
            expense.TOTAL = line.expense.value;
            expense.DISCEXP_CALC = '1';
        } else if (line?.expense?.type === 'percentage') {
            expense.DISCOUNT_RATE = line.expense.value;
        }
        return expense;
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
            DESCRIPTION: line.description,
            TRCODE: 8,
            DETAIL_LEVEL: type ? 1 : 0,
            SALEMANCODE: ficheBody?.employeeCode,
        };
    }
};
const createNewSale = async (req, res, next, tryCount = 0) => {
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
            rate1: {
                [Op.ne]: 0,
            },
        },
        order: [['date', 'desc']],
        attributes: ['rate1'],
    });
    const exchangeRD =
        Object.keys(exchangeRDobj).length && exchangeRDobj?.rate1
            ? exchangeRDobj?.rate1
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
        AUTH_CODE: ficheBody?.authCode,
        DOC_DATE: new Date(),
        TYPE: 8,
        GRPCODE: 2,
        VAT_RATE: 0,
        AFFECT_RISK: 1,
        CURRSEL_DETAILS: 4,
        CURRSEL_TOTALS: 1,
        RC_XRATE: exchangeRD,
        ORDER_STATUS: 1,
        TRANSACTIONS: {
            items: [],
        },
    };

    if (ficheBody?.lines.length) {
        tigerJSON.TRANSACTIONS.items = ficheBody?.lines.map((line) =>
            checkLineType(line, ficheBody, exchangeRD)
        );
        ficheBody?.underLines.forEach((line) => {
            tigerJSON.TRANSACTIONS.items.push(
                checkLineType(line, ficheBody, exchangeRD, 'under')
            );
        });
    } else {
        next(new AppError('Fiche Lines is required', 400));
        return;
    }

    // res.json(tigerJSON.TRANSACTIONS.items);
    // return;

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
                    if (tryCount <= 3) {
                        await delay(2000);
                        tryCount++;
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
