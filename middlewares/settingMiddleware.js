const mongoose = require('mongoose');
const getData = require('./../controllers/corsControllers/custom').getData;

/**
 * Commercial settings
 */
const settingCommercial = async () => {
  try {
    const [settingCommercial] = await Promise.all([getData('SettingCommercial')]).then((data) => {
      return data;
    });
    return settingCommercial;
  } catch (error) {
    return error;
  }
};

/**
 * Global settings
 */
const settingGlobal = async () => {
  try {
    const [settingGlobal] = await Promise.all([getData('SettingGlobal')]).then((data) => {
      return data;
    });
    return settingGlobal;
  } catch (error) {
    return error;
  }
};

/*
 * Export all settings from here
 */
const settings = async (req, res, next) => {
  req.settings = {};
  req.settings.commercial = await settingCommercial();
  req.settings.global = await settingGlobal();

  next();
};

module.exports = {
  settings,
};
