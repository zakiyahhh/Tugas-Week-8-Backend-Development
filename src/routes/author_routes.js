const express = require("express");
const authorController = require("../controllers/author_controller");


const authorRoutes = express.Router();

authorRoutes.post("/author", authorController.insert);

authorRoutes.get("/authors", authorController.getAll);

authorRoutes.post("/author/upload", authorController.upload);

authorRoutes.put("/author/:id", authorController.update);

authorRoutes.get("/author/:id", authorController.getById);

authorRoutes.delete("/author/:id", authorController.delete);

module.exports = authorRoutes;