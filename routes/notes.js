const router = require("express").Router();
const res = require("express/lib/response");
const fs = require("fs");
const util = require("util");

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        fs.writeFile(file, JSON.stringify(parsedData), (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Success');
            }
        });
      }
    });
  };

// GET Route for homepage
router.get("/", (req, res) => {
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});



// POST Route for a new UX/UI tip
router.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        // delete note 
        // tip_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/notes.json');
      res.json(`Tip added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
  });
module.exports = router;
