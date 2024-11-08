const express = require("express");
const bookController = require("../controllers/book_controller");

const bookRoutes = express.Router();

bookRoutes.post("/book", bookController.insert);

bookRoutes.get("/books", bookController.getAll);

bookRoutes.put("/book/:id", bookController.update);

bookRoutes.delete("/book/:id", bookController.delete);

bookRoutes.post("/book/:id/upload", bookController.uploadCover);

module.exports = bookRoutes;