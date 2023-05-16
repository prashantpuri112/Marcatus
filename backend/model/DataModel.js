import mongoose from "mongoose";

const marketData = mongoose.model("Data", {
    overall: { type: {} },
    turnover: { type: {} },
    sector: { type: {} },
    broker: { type: {} },
    stock: { type: {} }


})

export default marketData