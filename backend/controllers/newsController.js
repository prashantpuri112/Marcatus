import UserModel from '../model/UserModel.js'
import NewsModel from '../model/NewsModel.js'
import jwt from 'jsonwebtoken';
import ENV from '../config.js'


// Middleware to verify that a user is admin
export async function verifyAdmin(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(400).send({ error: "Login Required!" })
        }

        const data = jwt.verify(token, ENV.JWT_SECRET);

        UserModel.findOne({ _id: data.userId }).then(function (result) {
            if (result.is_admin) {
                req.user = result;
                next();
            } else {
                return res.status(401).send({ error: "Unauthorized Access!" })
            }
        }).catch();
    }
    catch (err) {
        console.log(err)
        return res.status(400).send({ message: err, success: false })
    }
}

export async function createNews(req, res) {
    try {
        const { title, subtitle, slug, category, description, content, is_featured, is_published } = req.body

        const image = req.file?.path
        const news = new NewsModel({ title, subtitle, slug, category, image, description, content, is_featured, is_published })
        news.save().then((news) => {
            return res.status(200).send({ message: "News created successfully." })
        }).catch((err) => {
            if (err.name === "ValidationError") {
                return res.status(400).send({ error: err.errors.title ? err.errors.title.message : err.errors.slug.message })
            } else {
                return res.status(400).send({ error: "Cannot create news" })
            }
        })
    } catch (err) {
        return res.status(400).send({ error: "Something went wrong" })
    }
}

export async function getNews(req, res) {
    try {

        const category = req.query.category
        console.log(category)


        const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
        const limit = 12; // Number of items per page (default: 10)

        const totalNewsCount = await NewsModel.countDocuments(); // Get the total number of news articles

        const totalPages = Math.ceil(totalNewsCount / limit); // Calculate the total number of pages

        const skip = (page - 1) * limit; // Calculate the number of items to skip

        var news;


        if (category && category !== 'all-news') {
            news = await NewsModel.find(req.query )
                .sort({ date_created: -1 })
                .skip(skip)
                .limit(limit)
                .exec(); // Retrieve the news articles for the current page
        } else {
            delete req.query.category
            news = await NewsModel.find(req.query)
                .sort({ date_created: -1 })
                .skip(skip)
                .limit(limit)
                .exec(); // Retrieve the news articles for the current page
        }

        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        if (news) {
            return res.status(200).send({ news, nextPage, prevPage, totalPages })
        } else {
            return res.status(400).send({ error: "No news not found" })
        }
    } catch (err) {
        return res.status(400).send({ error: err })
    }
}

export async function getSingleNews(req, res) {
    try {
        const { slug } = req.params
        const news = await NewsModel.findOne({ slug: slug })
        if (news) {
            return res.status(200).send(news)
        } else {
            return res.status(400).send({ error: "News not found" })
        }
    } catch (err) {
        return res.status(400).send({ error: err })
    }
}

export async function updateNews(req, res) {
    try {
        const { slug } = req.params
        const news = await NewsModel.findOne({ slug: slug })
        if (news) {
            const { title, subtitle, slug, category, description, content, is_featured, is_published } = req.body

            console.log(title, slug)
            if (title === '') { return res.status(400).send({ error: 'Invalid title' }) }
            if (slug === '') { return res.status(400).send({ error: 'Invalid slug' }) }
            const image = req.file?.path
            NewsModel.findByIdAndUpdate(news._id, { title, subtitle, slug, category, image, description, content, is_featured, is_published }).then((news) => {
                return res.status(200).send({ message: "News updated successfully!" })
            }).catch((err) => {
                console.log(err)
                return res.status(400).send({ error: err })
            })
        } else {
            return res.status(400).send({ error: "News not found" })
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: err })
    }
}

export async function deleteNews(req, res) {
    try {
        const { slug } = req.params
        const news = await NewsModel.findOne({ slug: slug })
        if (news) {
            const deleted = await NewsModel.findByIdAndDelete(news._id)
            if (deleted) {
                return res.status(200).send({ message: "News deleted." })
            }
        } else {
            return res.status(400).send({ error: "News not found" })
        }
    } catch (err) {
        return res.status(400).send({ error: err })
    }
}

