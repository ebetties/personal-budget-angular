const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const myBudget = require('./budget-data.json');
const budget = require("./budget-data.json");


app.use(cors());



app.get('/budget', (req,res) => {
    res.json(myBudget)
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});