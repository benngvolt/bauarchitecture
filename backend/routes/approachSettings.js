const express = require ('express');
const router = express.Router();
const approachSettingsCtrl = require ('../controllers/approachSettings');
const auth = require('../middlewares/auth');

router.get('/',
            approachSettingsCtrl.getApproachSettings);

router.put('/',
            auth,
            approachSettingsCtrl.updateApproachSettings);

module.exports = router;
