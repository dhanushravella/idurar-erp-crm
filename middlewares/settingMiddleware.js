const mongoose = require('mongoose');
const getData = require('./../controllers/corsControllers/custom').getData;

/*
 * Export all settings from here
 */
const settings = async (req, res, next) => {
  req.settings = {};

  next();
};

module.exports = {
  settings,
};
