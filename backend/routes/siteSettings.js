const express = require ('express');
const router = express.Router();
const siteSettingsCtrl = require ('../controllers/siteSettings');
const auth = require('../middlewares/auth');

// Public : le site doit savoir s'il est en maintenance. Seule la modification demande d'être connecté.
router.get('/',
            siteSettingsCtrl.getSiteSettings);

router.put('/',
            auth,
            siteSettingsCtrl.updateSiteSettings);

module.exports = router;
