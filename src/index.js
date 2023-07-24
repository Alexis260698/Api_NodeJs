const express = require('express');
const apiRouter = require("../src/routes/routes");
const cors = require('cors')

const NODE_ENV = process.env.NODE_ENV || "development";


require('dotenv').config({
    path: `.env.${NODE_ENV}`
});


const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.json())
app.use("/api", apiRouter);


app.listen(PORT, () => { })

