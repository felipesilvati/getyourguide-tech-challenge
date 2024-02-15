const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const healthcheckRoutes = require('./routes/healthcheck.routes');

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(morgan('dev'));

app.use('/healthcheck', healthcheckRoutes);

module.exports = app;