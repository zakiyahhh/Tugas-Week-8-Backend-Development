const AuthorModel = require("../models/author_model.js");
const {
    responseJson
} = require("../utils/http.js");

const authorController = {};

authorController.insert = async (req, res, next) => {
    try {
        const {
            name
        } = req.body;

        if (!name) {
            throw {
                name: "bad_request",
            };
        }

        const result = await AuthorModel.create({
            name,
            isDeleted: false,
        });

        responseJson(res, {
            author: result
        }, "Author created successfully", 201);
    } catch (error) {
        next(error);
    }
};

authorController.getAll = async (req, res, next) => {
    try {
        const result = await AuthorModel.find({
            isDeleted: false
        });
        responseJson(res, {
            author: result
        }, "Author found successfully", 200);
    } catch (error) {
        next(error);
    }
};

authorController.upload = async (req, res, next) => {
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

        const result = await AuthorModel.findByIdAndUpdate(id, {
            imageUrl: imageUrl,
            updatedAt: new Date(),
            isDeleted: false,
        }, {
            new: true
        });

        if (!result) {
            throw {
                name: "not_found"
            }
        }

        responseJson(res, {
            author: result
        }, "Image upload successfully", 200);
    } catch (error) {
        next(error);
    }
};

authorController.update = async (req, res, next) => {
    try {
        const {
            name
        } = req.body;
        const {
            id
        } = req.params;

        if (!name || !id) {
            throw {
                name: "bad_request"
            };
        }

        const result = await AuthorModel.findByIdAndUpdate(id, {
            name,
            updatedAt: new Date(),
            isDeleted: false,
        }, {
            new: true
        });

        if (!result) {
            throw {
                name: "not_found"
            }
        }

        responseJson(res, {
            author: result
        }, "Author update successfully", 200);
    } catch (error) {
        next(error);
    }
};

authorController.getById = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        if (!id) {
            throw {
                name: "bad_request"
            };
        }

        const result = AuthorModel.findById(id, {
            isDeleted: false
        });

        if (!result) {
            throw {
                name: "not_found"
            }
        }

        responseJson(res, {
            author: result
        }, "Author found successfully", 200);
    } catch (error) {
        next(error);
    }
};

authorController.delete = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        if (!id) {
            throw {
                name: "bad_request"
            };
        }

        const result = await AuthorModel.findByIdAndDelete(id, {
            isDeleted: true,
            updatedAt: new Date()
        }, {
            new: true
        });

        if (!result) {
            throw {
                name: "not_found"
            }
        }

        result.isDeleted = true;
        responseJson(res, {
            author: result
        }, "Author delete successfully", 200);
    } catch (error) {
        next(error);
    }
};

module.exports = authorController;