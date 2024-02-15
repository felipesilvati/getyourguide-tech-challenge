const suppliers = require('../../resources/suppliers.json');

exports.getSuppliers = (req, res) => {
  res.status(200).json(suppliers);
}