const express = require ('express');
const router = express.Router();
const processSettingsCtrl = require ('../controllers/processSettings');
const auth = require('../middlewares/auth');

router.get('/',
            processSettingsCtrl.getProcessSettings);

router.put('/',
            auth,
            processSettingsCtrl.updateProcessSettings);

module.exports = router;
