'use strict';
const catchAsync = require('../../utils/catchAsync');
const getTigerToken = require('../../utils/getTigerToken');
const AppError = require('../../utils/appError');
const request = require('request');
const { Op, Sequelize } = require('sequelize');

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
        if (inc === 'division') {
            includes.push({
                model: req.models.divisions,
            });
        } else if (inc === 'currency') {
            includes.push({
                model: req.models.currencies,
            });
        }
    });
    return includes;
};

exportObj.getCases = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    req.models.cases
        .findAll({ include: checkIncludes(req), limit, offset })
        .then((cases) => {
            res.json(cases);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getCaseById = catchAsync(async (req, res, next) => {
    req.models.cases
        .findOne({ where: { id: req.params.id }, include: checkIncludes(req) })
        .then((case_) => {
            if (!case_) {
                res.status(404).json({
                    status: 'fail',
                    message: 'Case not found',
                });
                return;
            }
            res.json(case_);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});
const inputCase = async (req, res, next, tryCount = 0) => {
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
        TYPE: 11,
        SD_CODE: ficheBody?.caseCode,
        NUMBER: ficheBody?.number,
        DATE: ficheBody?.date,
        HOUR: ficheDate?.getHours(),
        MINUTE: ficheDate?.getMinutes(),
        DIVISION: ficheDate?.divisionNr,
        DIVISION: ficheBody?.divisionNr,
        CURR_TRANS: ficheBody?.currencyId,
        TC_XRATE: ficheBody?.currencyRate,
        TC_AMOUNT: ficheBody?.amount,
        AMOUNT: ficheBody?.amount * ficheBody?.currencyRate,
        RC_XRATE: exchangeRD,
        CURRSEL_DETAILS: 2,
        RC_AMOUNT: (ficheBody?.amount * ficheBody?.currencyRate) / exchangeRD,
        ATTACHMENT_ARP: {
            items: [
                {
                    ARP_CODE: ficheBody?.clientCode,
                    CURRSEL_TRANS: 2,
                    CURR_TRANS: ficheBody?.currencyId,
                    TC_XRATE: ficheBody?.currencyRate,
                    TC_AMOUNT: ficheBody?.amount,
                    RC_XRATE: exchangeRD,
                    CREDIT: ficheBody?.amount * ficheBody?.currencyRate,
                    RC_AMOUNT:
                        (ficheBody?.amount * ficheBody?.currencyRate) /
                        exchangeRD,
                    PAYMENT_LIST: {
                        items: [
                            {
                                MODULENR: 10,
                                SIGN: 1,
                                TRCODE: 1,
                                TRRATE: ficheBody?.currencyRate,
                                REPORTRATE: exchangeRD,
                                PAY_NO: 1,
                            },
                        ],
                    },
                    SALESMAN_CODE: ficheBody?.employeeCode,
                    DOC_NUMBER: ficheBody?.docNumber,
                },
            ],
        },

        SALESMAN_CODE: ficheBody?.employeeCode,
        DOC_NUMBER: ficheBody?.docNumber,
        AUXIL_CODE: ficheBody?.specode,
        DOC_DATE: new Date(),
        DESCRIPTION: ficheBody?.description,
        ITEXT: ficheBody?.text,
    };

    // res.json(tigerJSON);

    await request(
        {
            method: 'POST',
            url: `${process.env.TIGER_REST_URL}/safeDepositSlips`,
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
                        inputCase(req, res, next, tryCount);
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

exportObj.inputCase = inputCase;
module.exports = exportObj;
