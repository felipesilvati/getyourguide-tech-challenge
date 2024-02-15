const express = require('express');
const supplierController = require('../controllers/supplier.controller');
const router = express.Router();

router.get('/', supplierController.getSuppliers);

module.exports = router;