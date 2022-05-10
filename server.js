// require and invoke express
const express = require('express');
const app = express();
const api = require('./routes/index.js');

// creating port 
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', api);

app.use(express.static('public'));


// listening to the port 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);



// TODO: 
// make DELETE request work 
// fix heroku app (not opening/ file has been created)
// read me images are not appearing 
