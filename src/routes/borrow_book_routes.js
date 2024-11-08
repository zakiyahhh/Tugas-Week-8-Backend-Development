const express = require("express");
const borrowedBookController = require("../controllers/borrow_book_controller");

const borrowedBookRoutes = express.Router();

borrowedBookRoutes.post("/borrow/book", borrowedBookController.borrow);

borrowedBookRoutes.get("/borrow/book/list", borrowedBookController.getActiveBorrowedBooks);

borrowedBookRoutes.post("/borrow/book/return", borrowedBookController.returnBook);

module.exports = borrowedBookRoutes;