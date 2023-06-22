const express = require('express');
const path = require('path');

const router = express.Router();
const { catchErrors } = require('@/handlers/errorHandlers');

const settingsController = require('@/controllers/appControllers/settingsController');

// //____________________________________________ API for Global Setting _________________

router.route('/settings/create').post(catchErrors(settingsController.create));
router.route('/settings/read/:id').get(catchErrors(settingsController.read));
router.route('/settings/update/:id').patch(catchErrors(settingsController.update));
router.route('/settings/delete/:id').delete(catchErrors(settingsController.delete));
router.route('/settings/search').get(catchErrors(settingsController.search));
router.route('/settings/list').get(catchErrors(settingsController.list));
router.route('/settings/filter').get(catchErrors(settingsController.filter));

module.exports = router;
