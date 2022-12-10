const express = require("express");
const path = require("path");
const db = require('./db/db.json');
const fs = require('fs');


const app = express();
const PORT = 3001;

app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

app.post('/notes', (req, res) => {
    // let request;
    // request = {
    //     title: 'success',
    //     text: req.body,
    //   };
    //   console.log(request);
    //   res.send(request);
    console.log(req.body);
      if (req.body) {
        response = {
          noteID: 'success',
          data: req.body,
        };
        res.status(201).json(response);
      } else {
        res.status(400).json('Request body must at least contain a product name');
      }
})

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
