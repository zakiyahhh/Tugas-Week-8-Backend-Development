const BorrowedBookModel = require("../models/borrow_book_model.js");
const {
    responseJson
} = require("../utils/http.js");

const borrowedBookController = {};

borrowedBookController.borrow = async (req, res, next) => {
    try {
        const {
            bookId,
            borrowerId,
            expectedReturnedAt,
        } = req.body;

        const borrowedBook = new BorrowedBookModel({
            book: bookId,
            borrower: borrowerId,
            expectedReturnedAt,
        });

        await borrowedBook.save();

        responseJson(res, {
            borrowedBook
        }, "Created successfully", 201);
    } catch (error) {
        console.error("Error borrowing book:", error);
        responseError(res, error.message || "Failed to borrow book", 500);
        next(error);
    }
};

borrowedBookController.getActiveBorrowedBooks = async (req, res, next) => {
    try {
        const borrowedBooks = await BorrowedBookModel.find({
            returnedAt: null
        }).populate('book borrower');
        responseJson(res, {
            borrowedBooks
        }, "Active borrowed books retrieved", 200);
    } catch (error) {
        console.error("Error retrieving borrowed books:", error);
        responseError(res, error.message || "Failed to retrieve borrowed books", 500);
        next(error);
    }
};

borrowedBookController.returnBook = async (req, res, next) => {
    try {
        const {
            borrowedBookId
        } = req.body;

        const updatedBorrowedBook = await BorrowedBookModel.findByIdAndUpdate(
            borrowedBookId, {
                returnedAt: Date.now()
            }, {
                new: true
            }
        );

        responseJson(res, {
            updatedBorrowedBook
        }, "Book returned successfully", 200);
    } catch (error) {
        console.error("Error returning book:", error);
        responseError(res, error.message || "Failed to return book", 500);
        next(error);
    }
};

module.exports = borrowedBookController;