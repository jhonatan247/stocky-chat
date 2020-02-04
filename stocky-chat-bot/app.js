const express = require('express');
const cors = require('cors');

const CommandRecognizerRouter = require('./app/command-recognizer/routes')
  .CommandRecognizerRouter;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/recognize-command', CommandRecognizerRouter);

module.exports = app;
