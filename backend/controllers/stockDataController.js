import marketData from "../model/DataModel.js";
import fs from 'fs'
import csv from 'csv-parser'
import stockCompModel from "../model/StockCompModel.js";
import forexModel from "../model/ForexModel.js";
import portfolioModel from "../model/PortfolioModel.js";
import { calculateBuy, calculateNetProfit, calculateProfit, calculateSell } from "../utils/calculate.js";

export async function MarketSummary(req, res) {
    const data = await marketData.aggregate([
        {
            $match: { 'stock.detail.s': 'ADBL' }
        },
        {
            $project: {
                objectAtIndex: {
                    $arrayElemAt: ['$stock.detail', {
                        $indexOfArray: ['$stock.detail.s', 'ACLBSL']
                    }]
                }
            }
        }
    ]);
    // const data = await marketData.find({'stock': {'detail':[{'s': "ADBL"}]}})
    console.log(data)
}

export async function ExtractData(req, res) {
    const file = req.file
    console.log(file)

    if (!file) return res.status(400).send({ error: "The file is probably empty." })

    const existingData = await stockCompModel.find({}).lean();
    const existingRecords = new Set(existingData.map(record => record.company_name)); // Assuming field1 is the unique identifier for duplicate check

    try {
        fs.createReadStream(file.path)
            .pipe(csv())
            .on('data', async (row) => {
                try {
                    // Create a new instance of the Mongoose model using the CSV data

                    const company_name = row.Company
                    if (existingRecords.has(company_name)) {
                        stockCompModel.findOneAndUpdate({ company_name: row.Company }, {
                            company_name: row.Company,
                            symbol: row.Symbol,
                            sector: row.Sector,
                            listed_share: row['Listed Share'],
                            paid_up: row['Paid-up (Rs)'],
                            total_paid_up_capital: row['Total Paid-up Capital (Rs)'],
                            eps: row.EPS,
                            date_of_operation: row['Date of Operation'],
                            pe_ratio: row['PE ratio'],
                            book_value: row['Book Value']
                        })
                            .then((docs) => {
                                // console.log("Existing Record Updated")
                            })
                    } else {
                        const newData = new stockCompModel({
                            company_name: row.Company,
                            sector: row.Sector,
                            symbol: row.Symbol,
                            listed_share: row['Listed Share'],
                            paid_up: row['Paid-up (Rs)'],
                            total_paid_up_capital: row['Total Paid-up Capital (Rs)'],
                            eps: row.EPS,
                            date_of_operation: row['Date of Operation'],
                            pe_ratio: row['PE Ratio'],
                            book_value: row['Book Value']
                        });

                        // Save the new document to the database
                        await newData.save();
                    }

                } catch (error) {
                    console.error('Error saving data:', error);
                }
            })
        return res.status(200).send({ msg: "Data extracted successfully" })
    } catch (err) {
        return res.status(400).send({ error: "Failed to save the data." })
    }
}

export async function StockData(req, res) {

    try {
        // Pagination
        const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
        const limit = 15; // Number of items per page (default: 10)
        const totalDataCount = await stockCompModel.find(req.query).countDocuments(); // Get the total number of news articles
        const totalPages = Math.ceil(totalDataCount / limit); // Calculate the total number of pages
        const skip = (page - 1) * limit; // Calculate the number of items to skip

        const data = await stockCompModel.find(req.query)
            .skip(skip)
            .limit(limit)
            .exec();

        const companies = await stockCompModel.find({ sector: req.query.sector })

        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        return res.status(200).send({ stocks: data, companies: companies, nextPage, prevPage, totalPages })
    } catch (err) {
        console.log(err)
        console.log("Error getting data")
        // return res.status(400).send({error: 'Something went wrong'})
    }
}

export async function marketSummary(req, res) {
    try {
        const data = await marketData.findOne()
        return res.status(200).send(data)
    } catch (err) {
        return res.status(400).send({ error: "Failed to load data." })
    }
}

export async function forex(req, res) {
    try {
        const data = await forexModel.findOne()
        return res.status(200).send(data)
    } catch (err) {
        return res.status(400).send({ error: "Failed to load data." })
    }
}

export async function addPortfolio(req, res) {
    try {

        const { no_of_shares, buying_price, buy_date, buying_type } = req.body

        if (no_of_shares === '') return res.status(400).send({ error: "Invalid number of shares" })
        if (buying_price === '') return res.status(400).send({ error: "Invalid buying price" })
        if (buy_date === '') return res.status(400).send({ error: "Invalid buy date" })
        if (buying_type === '') return res.status(400).send({ error: "Invalid buying type" })

        req.body.user = req.user.userId
        const portfolio = new portfolioModel(req.body)

        portfolio.save()
        return res.status(200).send({ message: "Added to your portfolio." })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Failed to add portfolio" })
    }
}

export async function myPortfolio(req, res) {
    try {
        var portfolios = []
        const documents = await portfolioModel.find({ user: req.user.userId })

        const uniqueNames = {};
        const portfolioCompanies = documents.filter(obj => {
            if (!uniqueNames[obj.company]) {
                uniqueNames[obj.company] = true;
                return true;
            }
            return false;
        });

        documents.forEach(async (item, ind) => {
            const data = await marketData.aggregate([
                {
                    $project: {
                        objectAtIndex: {
                            $arrayElemAt: ['$stock.detail', {
                                $indexOfArray: ['$stock.detail.s', item.company.split(' ')[0]]
                            }]
                        }
                    }
                }
            ]);

            const newItem = { item, ...data[0]?.objectAtIndex }
            portfolios.push(newItem)
            if (ind === documents.length - 1) {
                portfolios.sort((a, b) => {
                    const nameA = a.s.toLowerCase();
                    const nameB = b.s.toLowerCase();

                    if (nameA < nameB) {
                        return -1;
                    } else if (nameA > nameB) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                return res.status(200).send({ portfolios, portfolioCompanies })
            }
        })
    } catch (err) {

    }
}

export async function individualPortfolio(req, res) {
    try {

        const { company } = req.query

        const filter = { user: req.user.userId }
        if (company) {
            filter.company = company
        }

        var portfolios = await portfolioModel.find(filter)

        var totalInvestment = 0
        var totalProfit = 0
        var totalShare = 0
        var totalNetWorth = 0
        var totalWorth = 0
        var totalNetProfit = 0
        var totalTodayProfitLoss = 0

        Promise.all(
            portfolios.map(async obj => {

                const data = await marketData.aggregate([
                    {
                        $project: {
                            objectAtIndex: {
                                $arrayElemAt: ['$stock.detail', {
                                    $indexOfArray: ['$stock.detail.s', obj.company.split(' ')[0]]
                                }]
                            }
                        }
                    }
                ])

                obj['lp'] = data[0]?.objectAtIndex.lp
                obj['c'] = data[0]?.objectAtIndex.c

                var investment = calculateBuy(obj.no_of_shares, obj.buying_price)
                investment = obj.buying_type === 'secondary' ? investment : obj.buying_type === 'primary' || obj.buying_type === 'right' ? obj.no_of_shares * obj.buying_price : 0

                // Total Shares
                var shares = obj.no_of_shares

                // Profit
                var profit = calculateProfit(obj.no_of_shares, obj.buying_price, obj.lp, obj.buying_type)

                // Worth
                var worth = obj.lp * obj.no_of_shares

                // Net Worth
                const currentDate = new Date()
                var netWorth = calculateSell(obj.no_of_shares, obj.buying_price, obj.lp, parseInt(Math.ceil(Math.abs(new Date(currentDate) - new Date(obj.buy_date))) / (1000 * 60 * 60 * 24)) > 365 ? 0.05 : 0.075)

                // Net Profit
                var netProfit = calculateNetProfit(obj.no_of_shares, obj.buying_price, obj.lp, parseInt(Math.ceil(Math.abs(new Date(currentDate) - new Date(obj.buy_date))) / (1000 * 60 * 60 * 24)) > 365 ? 0.05 : 0.075)

                // Today Profit/Loss
                var todayProfitLoss = obj.no_of_shares * obj.c

                totalInvestment = parseFloat(totalInvestment + investment).toFixed(2)
                totalProfit = parseFloat(totalProfit + profit).toFixed(2)
                totalShare = totalShare + shares
                totalWorth = parseFloat(totalWorth + worth).toFixed(2)
                totalNetWorth = parseFloat(totalNetWorth + netWorth).toFixed(2)
                totalNetProfit = parseFloat(totalNetProfit + netProfit).toFixed(2)
                totalTodayProfitLoss = parseFloat(totalTodayProfitLoss + todayProfitLoss).toFixed(2)

                return { ...obj, investment, profit };
            })
        )
            .then((updatedPortfolios) => {
                console.log(totalProfit);
                return res.status(200).send({ totalInvestment, totalProfit, totalShare, totalWorth, totalNetWorth, totalNetProfit, totalTodayProfitLoss })
                // Further operations with updatedPortfolios
            })

    } catch (err) {
        console.log(err)
    }
}

export async function deletePortfolio(req, res) {
    try {
        const { portId } = req.query

        const port = await portfolioModel.findById(portId)
        if (port) {
            portfolioModel.findByIdAndDelete(portId).then(result => {
                console.log("Portfolio Deleted")
                return res.status(200).send({ message: 'Portfolio Deleted' })
            })
        } else {
            return res.status(400).send({ error: 'Cannot delete the portfolio.' })
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Cannot delete the portfolio.' })
    }
}