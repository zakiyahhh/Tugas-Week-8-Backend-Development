const express = require("express")
const testRoutes = require("./test_routes.js")
const authorRoutes = require("./author_routes.js");
const bookRoutes = require("./book_routes.js");
const categoryRoutes = require("./category_routes.js");
const borrowerRoutes = require("./borrower_routes.js");
const borrowedBookRoutes = require("./borrow_book_routes.js");

const routes = express.Router()

// kumpulkan semua routes disini per bagian ex : /author,/books dll
routes.use(testRoutes);
routes.use(authorRoutes);
routes.use(bookRoutes);
routes.use(categoryRoutes);
routes.use(borrowerRoutes);
routes.use(borrowedBookRoutes);

module.exports = routes