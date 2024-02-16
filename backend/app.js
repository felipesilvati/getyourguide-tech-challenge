const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const healthcheckRoutes = require('./routes/healthcheck.routes');
const activityRoutes = require('./routes/activity.routes');
const supplierRoutes = require('./routes/supplier.routes');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));

app.use('/healthcheck', healthcheckRoutes);
app.use('/activities', activityRoutes);
app.use('/suppliers', supplierRoutes)

module.exports = app;