import marketData from "../model/DataModel.js";
import stockData from "../model/StockModel.js";

const storeStockData = async (latestStockData) => {
    try {
        const date = new Date(latestStockData.date).toLocaleDateString();

        let stock = await stockData.findOne({ date: date });
        if (stock) {
            await stockData.findOneAndUpdate({ date: stock.date }, { date: date, dateTime: latestStockData.date, detail: latestStockData.detail });
            console.log('Data Updated.');
        } else {
            const saveStock = new stockData({ date: date, dateTime: latestStockData.date, detail: latestStockData.detail });
            await saveStock.save();
            console.log('Data Saved.');
        }
    } catch (err) {
        console.error(err);
    }
}

export default function startFetchInterval() {
    setInterval(storeData, 10000);  // Fetch data every 10 seconds (10000 milliseconds)
}

function storeData() {
    try {
        fetch('https://merolagani.com/handlers/webrequesthandler.ashx?type=market_summary').then((res) => {
            if (!res.ok) {
                throw new Error('Request failed');
            }
            return res.json()
        })
            .then(data => {
                marketData.deleteMany({}).then(() => {
                    const store = new marketData({
                        overall: data.overall,
                        turnover: data.turnover,
                        sector: data.sector,
                        broker: data.broker,
                        stock: data.stock
                    })
                    store.save()
                })

                storeStockData(data.stock)
            })
            .catch(error => {
                console.error(error);
            });
    } catch (err) {
        console.log("Failed to retrieve latest data.")
    }
}
