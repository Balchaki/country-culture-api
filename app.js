const express = require('express');
const app = express();
const apiRoutes = require('./src/routes/country.routes')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

module.exports = app;
