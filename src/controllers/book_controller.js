const mongoose = require("mongoose");
const bookModel = require("../models/book_model.js");
const {
    responseJson
} = require("../utils/http.js");

const bookController = {};

bookController.insert = async (req, res, next) => {
    try {
        const {
            title,
            totalStocks = 0,
            authorId,
            categories = [],
        } = req.body;

        if (!title || !authorId || !categories || categories.length === 0) {
            throw new Error("Title, author, and categories are required.");
        }

        const doc = await bookModel.create({
            title,
            totalStocks,
            author: authorId,
            category,
        });

        responseJson(res, {
            book: doc
        }, "Created successfully", 201);
    } catch (error) {
        next(error);
    }
};

bookController.getAll = async (req, res, next) => {
    try {
        const docs = await bookModel.find({
            isDeleted: false
        }).populate("author", "_id name").populate("category", "_id name");

        responseJson(res, {
            books: docs
        }, "Books found successfully", 200);
    } catch (error) {
        next(error);
    }
};

bookController.upload = async (req, res, next) => {
    try {
        const {
            coverImageUrl,
            id
        } = req.body;

        if (!coverImageUrl || !id) {
            throw {
                name: "bad_request"
            };
        }

        const result = await bookModel.findByIdAndUpdate(
            id,
            { coverImageUrl: coverImageUrl, updatedAt: new Date() }, 
            { new: true }
        );

        if (!result) {
            throw {
                name: "not_found"
            }
        }

        doc.imageUrl = imageUrl;
        responseJson(res, {
            book: result
        }, "Cover upload successfully", 200);
    } catch (error) {
        next(error);
    }
};

bookController.update = async (req, res, next) => {
    try {
        const {
            title,
            totalStocks,
            authorId,
            categories,
        } = req.body;
        const {
            id
        } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return responseError(res, {
                message: "Invalid book ID."
            }, 400);
        }

        if (!title || !authorId || !categories || categories.length === 0) {
            return responseError(res, {
                message: "Title, author, and categories are required."
            }, 400);
        }

        const updatedBook = await bookModel.findByIdAndUpdate(
            id, {
                title,
                totalStocks,
                author: authorId,
                categories,
                updatedAt: new Date()
            }, {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBook) {
            throw {
                name: "not_found"
            }
        }

        responseJson(res, {
            book: doc
        }, "Book update successfully", 200);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

bookController.getById = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        if (!id) {
            throw {
                name: "bad_request"
            };
        }

        const doc = await BookModel.findById(id, {
            isDeleted: false
        });

        if (!doc) {
            throw {
                name: "not_found"
            }
        }

        responseJson(res, {
            book: doc
        }, "Book found successfully", 200);
    } catch (error) {
        next(error);
    }
};

bookController.delete = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        if (!id) {
            throw {
                name: "bad_request"
            };
        }

        const deletedBook = await bookModel.findByIdAndUpdate(
            id,
            { isDeleted: true, updatedAt: new Date() },
            { new: true }
        );

        if (!deletedBook) {
            throw {
                name: "not_found"
            }
        }

        responseJson(res, {
            book: deletedBook
        }, "Book delete successfully", 200);
    } catch (error) {
        next(error);
    }
};

module.exports = bookController;