// requiring/invoking express
const express = require('express');
const app = express();

// Import our routers for /html and /notes
const htmlRouter = require('./html');
const notesRouter = require('./notes');

// import your routes
app.use('/', htmlRouter);
app.use('/api/notes', notesRouter);

module.exports = app;
