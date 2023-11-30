const express = require("express");
const app = express();
var cors = require("cors");

app.use(express.json());
app.use(cors());

const router = require("./router");
app.use("/api", router);

app.listen(3001, () => console.log("Server Started on port 3001"));
