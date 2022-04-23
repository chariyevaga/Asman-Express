'use strict';
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { Op, Sequelize } = require('sequelize');
const request = require('request');
const getTigerToken = require('../../utils/getTigerToken');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const exportObj = {};
/**
 * Checking query has include return array for include models
 *
 * @param {request} req
 * @returns {array} Array includes sequelize models
 */
const checkIncludes = (req) => {
    let includeArray = Array.isArray(req.query?.include)
        ? req.query.include
        : req.query?.include
        ? [req.query.include]
        : [];

    let includes = [];
    includeArray.forEach((inc) => {
        if (inc === 'bankAccounts') {
            includes.push({
                model: req.models.bankAccounts,
            });
        } else if (inc === 'bank') {
            includes.push({
                model: req.models.banks,
            });
        } else if (inc === 'currency') {
            includes.push({
                model: req.models.currencies,
            });
        }
    });
    return includes;
};

exportObj.getBanks = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    req.models.banks
        .findAll({ include: checkIncludes(req), limit, offset })
        .then((banks) => {
            res.json(banks);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getBankById = catchAsync(async (req, res, next) => {
    req.models.banks
        .findOne({ where: { id: req.params.id }, include: checkIncludes(req) })
        .then((bank) => {
            if (!bank) {
                res.status(404).json({
                    status: 'fail',
                    message: 'Bank not found',
                });
                return;
            }
            res.json(bank);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getBankAccounts = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    req.models.bankAccounts
        .findAll({ include: checkIncludes(req), limit, offset })
        .then((bankAccounts) => {
            res.json(bankAccounts);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getBankAccountById = catchAsync(async (req, res, next) => {
    req.models.bankAccounts
        .findOne({ where: { id: req.params.id }, include: checkIncludes(req) })
        .then((bankAccount) => {
            if (!bankAccount) {
                res.status(404).json({
                    status: 'fail',
                    message: 'Bank not found',
                });
                return;
            }
            res.json(bankAccount);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

const inputBank = async (req, res, next, tryCount = 0) => {
    const ficheBody = req.body;
    if (!Object.keys(ficheBody)?.length) {
        next(new AppError('Case input body is required', 400));
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

    const ficheDate = new Date(ficheBody.date);
    const tigerJSON = {
        DATE: ficheBody?.date,
        TIME:
            ficheDate?.getHours() * 65536 * 256 +
            ficheDate?.getMinutes() * 65536 +
            ficheDate?.getSeconds() * 256,
        NUMBER: ficheBody?.code,
        DIVISION: ficheBody?.divisionNr,
        TYPE: '3',
        CURRSEL_TOTALS: 1,
        CURRSEL_DETAILS: 2,
        SALESMAN_CODE: ficheBody?.employeeCode,
        AUXIL_CODE: ficheBody?.specode,
        DOC_DATE: new Date(),
        NOTES1: ficheBody?.description,
        PROJECT_CODE: ficheBody?.projectCode,
        ITEXT: ficheBody?.text,
        TRANSACTIONS: {
            items: [],
        },
    };

    if (!ficheBody?.transactions?.length) {
        next(new AppError('Transactions required', 400));
        return;
    }
    tigerJSON.TRANSACTIONS.items = ficheBody?.transactions.map((line) => {
        const transactionLine = {
            TYPE: '1',
            BANKACC_CODE: line.bankAccountCode,
            ARP_CODE: line.clientCode,
            SOURCEFREF: line.divisionNr,
            DATE: ficheBody?.date,
            TIME:
                ficheDate?.getHours() * 65536 * 256 +
                ficheDate?.getMinutes() * 65536 +
                ficheDate?.getSeconds() * 256,
            TRCODE: '3',
            MODULENR: '7',
            AUXIL_CODE: line.specode,
            DOC_NUMBER: line.docNumber,
            DESCRIPTION: line.description,
            TC_XRATE: line?.currencyRate,
            TC_AMOUNT: line?.amount,
            CURR_TRANS: line?.currencyId,
            RC_XRATE: exchangeRD,
            DEBIT: line?.amount * line?.currencyRate,
            // RC_AMOUNT:
            // (line?.amount * line?.currencyRate) / exchangeRD,
            BNK_TRACKING_NR: line.docTrack,
            BANK_PROC_TYPE: '2',
            DUE_DATE: new Date(),
            // PAYMENT_LIST: {
            //     items: [
            //         {
            //             DATE: ficheBody?.date,
            //             MODULENR: '7',
            //             SIGN: '1',
            //             TRCODE: '3',
            //             PROCDATE: ficheBody?.date,
            //             REPORTRATE: exchangeRD,
            //             DISCOUNT_DUEDATE: new Date(),
            //         },
            //     ],
            // },
            SALESMAN_CODE: ficheBody?.employeeCode,
            BN_CRDTYPE: '1',
            DIVISION: ficheBody?.divisionNr,
        };
        if (line?.expense?.amount) {
            transactionLine.TR_COST_TOTAL = line?.expense?.amount;
            transactionLine.COST_TOTAL =
                line?.expense?.amount * line?.expense?.currencyRate;
            if (line?.expense?.type === 'include') {
                transactionLine.BNTRANCOSTTOTINC = 1;
            }
        }
        return transactionLine;
    });
    // res.json(tigerJSON);
    // return;

    await request(
        {
            method: 'POST',
            url: `${process.env.TIGER_REST_URL}/bankSlips`,
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
                        inputBank(req, res, next, tryCount);
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

exportObj.inputBank = inputBank;
module.exports = exportObj;
