const express = require("express")
const testRoutes = require("./test_routes.js")
const authorRoutes = require("./author_routes.js");

const routes = express.Router()

// kumpulkan semua routes disini per bagian ex : /author,/books dll
routes.use(testRoutes);
routes.use(authorRoutes);

module.exports = routes