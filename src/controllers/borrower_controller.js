const BorrowerModel = require("../models/borrower_model.js");
const {
    responseJson
} = require("../utils/http.js");

const borrowerController = {};

borrowerController.insert = async (req, res, next) => {
    try {
        const {
            name
        } = req.body;

        if (!name) {
            throw {
                name: "bad_request",
            };
        }

        const result = await BorrowerModel.create({
            name,
            isDeleted: false,
        });

        responseJson(res, {
            borrower: result
        }, "Borrower created successfully", 201);
    } catch (error) {
        next(error);
    }
};

borrowerController.getAll = async (req, res, next) => {
    try {
        const result = await BorrowerModel.find({
            isDeleted: false
        });
        responseJson(res, {
            borrower: result
        }, "Borrower found successfully", 200);
    } catch (error) {
        next(error);
    }
};

borrowerController.update = async (req, res, next) => {
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

        const result = await BorrowerModel.findByIdAndUpdate(id, {
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
            borrower: result
        }, "Borrower update successfully", 200);
    } catch (error) {
        next(error);
    }
};

borrowerController.getById = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        if (!id) {
            throw {
                name: "bad_request"
            };
        }

        const result = await BorrowerModel.findById(id, {
            isDeleted: false
        });

        if (!result) {
            throw {
                name: "not_found"
            }
        }

        responseJson(res, {
            borrower: result
        }, "Borrower found successfully", 200);
    } catch (error) {
        next(error);
    }
};

borrowerController.delete = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        if (!id) {
            throw {
                name: "bad_request"
            };
        }

        const result = await BorrowerModel.findByIdAndDelete(id, {
            isDeleted: true,
        });

        if (!result) {
            throw {
                name: "not_found"
            }
        }
        
        result.isDeleted = true;
        responseJson(res, {
            borrower: result
        }, "Borrower delete successfully", 200);
    } catch (error) {
        next(error);
    }
};

module.exports = borrowerController;