import mongoose from "mongoose";

const news = mongoose.model("News", {
    title: { type: String, required: [true, "News title is required."] },
    subtitle: {type: String},
    slug: { type: String, required: [true, "News slug is required."], unique: [true, "News slug already exists."] },
    category: { type: String, required: [true, "News category is required."] },
    image: { type: String },
    description: { type: String },
    content: { type: String },
    is_featured: { type: Boolean, default: false },
    is_published: { type: Boolean, default: false },
    date_created: { type: Date, default: new Date() }
})

export default news