const express = require ('express');
const router = express.Router();
const homeBannerCtrl = require ('../controllers/homeBanner');
const multer = require('../middlewares/multer-config');
const uploadImages = require('../middlewares/uploadImages').uploadImages;
const deleteImages = require('../middlewares/deleteImages').deleteImages;

router.get('/',
            homeBannerCtrl.getHomeBanner);

router.put('/',
            // auth,
            multer.fields([
                { name: 'banner' }
              ]),
            uploadImages,
            homeBannerCtrl.updateHomeBanner,
            deleteImages);

router.delete('/',
            // auth,
            homeBannerCtrl.resetHomeBanner,
            deleteImages);

module.exports = router;
