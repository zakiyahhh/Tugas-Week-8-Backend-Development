const express = require("express");
const bookController = require("../controllers/book_controller");

const bookRoutes = express.Router();

bookRoutes.post("/borrow/book", bookController.insert);

bookRoutes.get("/borrow/book/list", bookController.getAll);

bookRoutes.put("/book/:id", bookController.update);

bookRoutes.get("/book/:id", bookController.getById);

bookRoutes.delete("/book/:id", bookController.delete);

bookRoutes.post("/book/:id/upload", bookController.upload);

module.exports = bookRoutes;