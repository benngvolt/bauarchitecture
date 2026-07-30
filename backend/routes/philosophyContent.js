const express = require ('express');
const router = express.Router();
const philosophyContentCtrl = require ('../controllers/philosophyContent');
const multer = require('../middlewares/multer-config');
const uploadImages = require('../middlewares/uploadImages').uploadImages;
const deleteImages = require('../middlewares/deleteImages').deleteImages;

router.get('/',
            philosophyContentCtrl.getPhilosophyContent);

router.put('/',
            // auth,
            multer.fields([
                { name: 'philosophy' }
              ]),
            uploadImages,
            philosophyContentCtrl.updatePhilosophyContent,
            deleteImages);

router.delete('/image',
            // auth,
            philosophyContentCtrl.resetPhilosophyImage,
            deleteImages);

module.exports = router;
