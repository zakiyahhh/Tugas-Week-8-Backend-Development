const BookModel = require("../models/book_model.js");
const {
    responseJson
} = require("../utils/http.js");

const bookController = {};

bookController.insert = async (req, res, next) => {
    try {
        const {
            title,
            totalStocks = 0
        } = req.body;

        if (!title) {
            throw {
                name: "bad_request",
            };
        }

        const result = await BookModel.create({
            title,
            totalStocks,
        });

        responseJson(res, {
            book: result
        }, "Book created successfully", 201);
    } catch (error) {
        next(error);
    }
};

bookController.getAll = async (req, res, next) => {
    try {
        const result = await BookModel.find({
            isDeleted: false
        });
        responseJson(res, {
            book: result
        }, "Book found successfully", 200);
    } catch (error) {
        next(error);
    }
};

bookController.upload = async (req, res, next) => {
    try {
        const {
            imageUrl,
            id
        } = req.body;

        if (!imageUrl || !id) {
            throw {
                name: "bad_request"
            };
        }

        const result = await BookModel.findByIdAndUpdate(id, {
            imageUrl,
        }, {
            isDeleted: false
        });

        if (!result) {
            throw {
                name: "not_found"
            }
        }

        result.imageUrl = imageUrl;
        responseJson(res, {
            book: result
        }, "Book upload successfully", 200);
    } catch (error) {
        next(error);
    }
};

bookController.update = async (req, res, next) => {
    try {
        const {
            title
        } = req.body;
        const {
            id
        } = req.params;

        if (!title || !id) {
            throw {
                name: "bad_request"
            };
        }

        const result = await BookModel.findByIdAndUpdate(id, {
            title,
            isDeleted: false,
        });

        if (!result) {
            throw {
                name: "not_found"
            }
        }

        result.title = title;
        responseJson(res, {
            book: result
        }, "Book update successfully", 200);
    } catch (error) {
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

        const result = await BookModel.findById(id, {
            isDeleted: false
        });

        if (!result) {
            throw {
                name: "not_found"
            }
        }

        responseJson(res, {
            book: result
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

        const result = await BookModel.findByIdAndDelete(id, {
            isDeleted: true,
        });

        if (!result) {
            throw {
                name: "not_found"
            }
        }

        responseJson(res, {
            book: result
        }, "Book delete successfully", 200);
    } catch (error) {
        next(error);
    }
};

module.exports = bookController;