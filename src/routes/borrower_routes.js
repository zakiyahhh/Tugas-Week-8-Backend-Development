const express = require("express");
const borrowerController = require("../controllers/borrower_controller");


const borrowerRoutes = express.Router();

borrowerRoutes.post("/borrower", borrowerController.insert);

borrowerRoutes.get("/borrowers", borrowerController.getAll);

borrowerRoutes.put("/borrower/:id", borrowerController.update);

borrowerRoutes.get("/borrower/:id", borrowerController.getById);

borrowerRoutes.delete("/borrower/:id", borrowerController.delete);

module.exports = borrowerRoutes;