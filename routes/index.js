const express = require('express');
const app = express();

// Import our modular routers for /tips and /feedback
const htmlRouter = require('./html');
const notesRouter = require('./notes');

// TODO: import your diagnostics route
app.use('/', htmlRouter);
app.use('/api/notes', notesRouter);

module.exports = app;
