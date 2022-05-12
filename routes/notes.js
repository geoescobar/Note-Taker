const router = require("express").Router();
const res = require("express/lib/response");
const fs = require("fs");
const util = require("util");
const { uuid } = require("uuidv4");

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// reading data and appending given content
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      fs.writeFile(file, JSON.stringify(parsedData), (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Success");
        }
      });
    }
  });
};

const readAndDelete = (id, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const filteredData = parsedData.filter((note) => {
        return note.id != id;
      });
      fs.writeFile(file, JSON.stringify(filteredData), (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Success");
        }
      });
    }
  });
};

// GET Route for homepage
router.get("/", (req, res) => {
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

//
router.delete("/:id", (req, res) => {
  // req.params.id
  const { id } = req.params;
  readAndDelete(id, "./db/notes.json");
  res.send(200);
});

// POST Route for a new note
router.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      id: uuid(),
      title,
      text,
    };

    readAndAppend(newNote, "./db/notes.json");
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error("Error in adding tip");
  }
});

module.exports = router;
