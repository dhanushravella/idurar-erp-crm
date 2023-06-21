const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const { catchErrors } = require('@/handlers/errorHandlers');
const adminController = require('@/controllers/appControllers/adminController');
const roleController = require('@/controllers/appControllers/roleController');

const employeeController = require('@/controllers/appControllers/employeeController');

const settingsController = require('@/controllers/appControllers/settingsController');

// //____________________________ Role management_______________________________

router.route('/role/create').post(catchErrors(roleController.create));
router.route('/role/read/:id').get(catchErrors(roleController.read));
router.route('/role/update/:id').patch(catchErrors(roleController.update));
router.route('/role/delete/:id').delete(catchErrors(roleController.delete));
router.route('/role/search').get(catchErrors(roleController.search));
router.route('/role/list').get(catchErrors(roleController.list));
router.route('/role/filter').get(catchErrors(roleController.filter));

// //____________________________________________ API for Global Setting _________________

router.route('/settings/create').post(catchErrors(settingsController.create));
router.route('/settings/read/:id').get(catchErrors(settingsController.read));
router.route('/settings/update/:id').patch(catchErrors(settingsController.update));
router.route('/settings/delete/:id').delete(catchErrors(settingsController.delete));
router.route('/settings/search').get(catchErrors(settingsController.search));
router.route('/settings/list').get(catchErrors(settingsController.list));
router.route('/settings/filter').get(catchErrors(settingsController.filter));

module.exports = router;
