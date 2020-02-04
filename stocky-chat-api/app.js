var express = require('express');
var cors = require('cors');

var AccountRouter = require('./app/authentication/routes').AccountRouter;
var AuthenticationRouter = require('./app/authentication/routes')
  .AuthenticationRouter;

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/accounts', AccountRouter);
app.use('/api/auth', AuthenticationRouter);

module.exports = app;
