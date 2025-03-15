require("dotenv").config()
const express = require("express");
const app = express();
const port = process.env.PORT || 5001
const cors = require('cors');
const { aiPromt } = require("./config/geneAi");

app.use(cors()) // communcate from frontend to backend
app.use(express.json()) // req.body as json
app.use(express.urlencoded({ extended: true }));

app.get("/", aiPromt)
app.post("/", aiPromt)

app.listen(port, ()=>{
    console.log(port)
})