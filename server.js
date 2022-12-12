const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

app.get("/api/notes", (req, res) => {
  res.json(db.slice(1));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

function addNewNote(body, notesArray) {
  const newNote = body;

  if (notesArray.length === 0) {
    notesArray.push(0);
  }

  newNote.id = notesArray[0];
  notesArray[0]++;
  notesArray.push(newNote);

  fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notesArray, null, 2));
  return newNote;
}

app.post("/api/notes", (req, res) => {
  const newNote = addNewNote(req.body, db);
  res.json(newNote);
});

function deleteNote(id, notesArray) {
  const filteredArray = notesArray.filter(note => note.id != id);
  fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(filteredArray, null, 2));
}

app.delete("/api/notes/:id", (req, res) => {
  deleteNote(req.params.id, db);
  res.json(true);
});
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
