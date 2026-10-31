const express = require ('express');
const router = express.Router();
const approachSettingsCtrl = require ('../controllers/approachSettings');

router.get('/',
            approachSettingsCtrl.getApproachSettings);

router.put('/',
            // auth,
            approachSettingsCtrl.updateApproachSettings);

module.exports = router;
