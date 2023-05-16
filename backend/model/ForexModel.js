import mongoose, { mongo } from "mongoose";

const forexModel = mongoose.model("Forex", {
    date: { type: String },
    published_on: { type: Date },
    modified_on: { type: Date },
    rates: { type: [] }
})

export default forexModel