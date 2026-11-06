const express = require ('express');
const router = express.Router();
const heroSettingsCtrl = require ('../controllers/heroSettings');
const multer = require('../middlewares/multer-config');
const uploadImages = require('../middlewares/uploadImages').uploadImages;
const deleteImages = require('../middlewares/deleteImages').deleteImages;
const auth = require('../middlewares/auth');

router.get('/',
            heroSettingsCtrl.getHeroSettings);

router.put('/texts',
            auth,
            heroSettingsCtrl.updateHeroTexts);

router.post('/images',
            auth,
            multer.fields([
                { name: 'hero' }
              ]),
            uploadImages,
            heroSettingsCtrl.addHeroImages,
            deleteImages);

router.put('/images/order',
            auth,
            heroSettingsCtrl.reorderHeroImages);

router.delete('/images/:imageId',
            auth,
            heroSettingsCtrl.removeHeroImage,
            deleteImages);

router.delete('/',
            auth,
            heroSettingsCtrl.deleteHeroSettings,
            deleteImages);

module.exports = router;
