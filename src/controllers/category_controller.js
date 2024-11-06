const CategoryModel = require("../models/category_model.js");
const {
    responseJson
} = require("../utils/http.js");

const categoryController = {};

categoryController.insert = async (req, res, next) => {
    try {
        const {
            name
        } = req.body;

        if (!name) {
            throw {
                name: "bad_request",
            };
        }

        const result = await CategoryModel.create({
            name,
            isDeleted: false,
        });

        responseJson(res, {
            category: result
        }, "Category created successfully", 201);
    } catch (error) {
        next(error);
    }
};

categoryController.getAll = async (req, res, next) => {
    try {
        const result = await CategoryModel.find({
            isDeleted: false
        });
        responseJson(res, {
            category: result
        }, "Category found successfully", 200);
    } catch (error) {
        next(error);
    }
};

categoryController.update = async (req, res, next) => {
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

        const result = await CategoryModel.findByIdAndUpdate(id, {
            name,
            isDeleted: false,
        });

        if (!result) {
            throw {
                name: "not_found"
            }
        }

        result.name = name;
        responseJson(res, {
            category: result
        }, "Category update successfully", 200);
    } catch (error) {
        next(error);
    }
};

categoryController.getById = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        if (!id) {
            throw {
                name: "bad_request"
            };
        }

        const result = await CategoryModel.findById(id, {
            isDeleted: false
        });

        if (!result) {
            throw {
                name: "not_found"
            }
        }

        responseJson(res, {
            category: result
        }, "Category found successfully", 200);
    } catch (error) {
        next(error);
    }
};

categoryController.delete = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        if (!id) {
            throw {
                name: "bad_request"
            };
        }

        const result = await CategoryModel.findByIdAndDelete(id, {
            isDeleted: true,
        });

        if (!result) {
            throw {
                name: "not_found"
            }
        }
        
        result.isDeleted = true;
        responseJson(res, {
            category: result
        }, "Category delete successfully", 200);
    } catch (error) {
        next(error);
    }
};

module.exports = categoryController;