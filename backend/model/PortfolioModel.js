import mongoose from "mongoose";

const portfolioModel = mongoose.model("Portfolio", {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    company: { type: String },
    sector: { type: String },
    symbol: { type: String },
    no_of_shares: { type: Number },
    buying_price: { type: Number },
    buy_date: { type: Date },
    buying_type: { type: String },
    lp: { type: String, default: '' },
    c: { type: String, default: '' },
})

export default portfolioModel