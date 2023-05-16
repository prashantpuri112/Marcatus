import mongoose from 'mongoose'

const stockCompModel = mongoose.model("StockComp", {
    company_name: { type: String },
    symbol: { type: String },
    sector: { type: String },
    listed_share: { type: String },
    paid_up: { type: String },
    total_paid_up_capital: { type: String },
    eps: { type: String },
    date_of_operation: { type: Date },
    pe_ratio: { type: String },
    book_value: { type: String },
})

export default stockCompModel