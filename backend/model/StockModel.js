import mongoose from "mongoose";

const stockData = mongoose.model("Stock", {
    date: { type: String },
    dateTime: { type: Date },
    detail: { type: Array }
})

export default stockData