const express = require('express');
const bodyParser = require('body-parser');
const app =  express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.get("/", (req, res) => {
    res.json({ data : "LOOP"})
});

app.post("/", (req, res) => {
    const name =  req.body.name;
    if(!name || name === undefined) {
        res.sendStatus(400);
    } else {
        res.json({
            input : name
        })
    }
});

app.get("/api", (req, res) => {
    res.json({
        data: "Sahad"
    })
});

module.exports = app;