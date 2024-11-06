const express = require('express');
const routes = require('./routes');
const connectDB = require('./config/mongodb.js');
const app = express();
const cors = require("cors");
const { errorHandling } = require("./middleware/global_error.js");

require('dotenv').config({ path: "./src/.env" });

app.use(
  cors({
    url: ["*"],
  })
);

const port = process.env.PORT;

connectDB();

app.use(express.json());

app.use("/api/v1",routes);
app.use(errorHandling);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});