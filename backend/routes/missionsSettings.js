const express = require ('express');
const router = express.Router();
const missionsSettingsCtrl = require ('../controllers/missionsSettings');
const auth = require('../middlewares/auth');

router.get('/',
            missionsSettingsCtrl.getMissionsSettings);

router.put('/',
            auth,
            missionsSettingsCtrl.updateMissionsSettings);

module.exports = router;
