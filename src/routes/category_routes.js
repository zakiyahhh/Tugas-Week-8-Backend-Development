const express = require("express");
const categoryController = require("../controllers/category_controller");


const categoryRoutes = express.Router();

categoryRoutes.post("/xategory", categoryController.insert);

categoryRoutes.get("/categories", categoryController.getAll);

categoryRoutes.put("/xategory/:id", categoryController.update);

categoryRoutes.get("/xategory/:id", categoryController.getById);

categoryRoutes.delete("/xategory/:id", categoryController.delete);

module.exports = categoryRoutes;