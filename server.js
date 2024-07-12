const crypto  =  require("crypto")
const express = require("express");
const connectionDb  =  require("./lib/dbConnection")
const cors = require('cors');
const env = require("dotenv").config();
const bodyParser = require('body-parser');
const { secretKey } = require("./constants");
const PORT = process.env.PORT || 5000;
const app = express();
connectionDb();
//app.use(bodyParser.json());

app.use(express.json());
app.use(cors())
//app.use(express.json());
app.use("/auth", require("./routes/AuthRoute"))
app.use("/match", require("./routes/MatchRoute"))
//app.use("/test", require("./routes/NewTest"))






app.listen(PORT, ()=> {
    console.log("app  started at")
}  )