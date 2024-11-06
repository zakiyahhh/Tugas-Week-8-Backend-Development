const bookModel = require("../models/book_model.js");
const {
    responseJson
} = require("../utils/http.js");

exports.insert = async (req, res, next) => {
    try {
        const {
            title,
            totalStocks = 0
        } = req.body;

        if (!title) {
            throw new Error();
        }

        const doc = await bookModel.create({
            title,
            totalStocks,
        });

        responseJson(res, {
            book: doc
        }, "created", 201);
    } catch (error) {
        next(error);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const doc = await bookModel
            .find({
                isDelete: false
            })
            .populate("author", "_id name");

        responseJson(res, {
            books: doc
        }, "ok", 200);
    } catch (error) {
        next(error);
    }
};