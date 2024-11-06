const express = require("express");
const bookController = require("../controllers/book_controller");

const bookRoutes = express.Router();

bookRoutes.post("/book", bookController.insert);

bookRoutes.get("/books", bookController.getAll);

bookRoutes.post("/book/upload", bookController.upload);

bookRoutes.put("/book/:id", bookController.update);

bookRoutes.get("/book/:id", bookController.getById);

bookRoutes.delete("/book/:id", bookController.delete);

module.exports = bookRoutes;