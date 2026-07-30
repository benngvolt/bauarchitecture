const express = require ('express');
const router = express.Router();
const aboutPageContentCtrl = require ('../controllers/aboutPageContent');
const multer = require('../middlewares/multer-config');
const uploadImages = require('../middlewares/uploadImages').uploadImages;
const deleteImages = require('../middlewares/deleteImages').deleteImages;

router.get('/',
            aboutPageContentCtrl.getAboutPageContent);

router.put('/',
            // auth,
            multer.fields([
                { name: 'philosophy' },
                { name: 'photo1' },
                { name: 'photo2' },
              ]),
            uploadImages,
            aboutPageContentCtrl.updateAboutPageContent,
            deleteImages);

router.delete('/philosophy-image',
            // auth,
            aboutPageContentCtrl.resetPhilosophyImage,
            deleteImages);

router.delete('/photo1',
            // auth,
            aboutPageContentCtrl.resetPhoto1,
            deleteImages);

router.delete('/photo2',
            // auth,
            aboutPageContentCtrl.resetPhoto2,
            deleteImages);

module.exports = router;
