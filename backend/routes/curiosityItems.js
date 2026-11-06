const express = require ('express');
const router = express.Router();
const curiosityItemsCtrl = require ('../controllers/curiosityItems');
const multer = require('../middlewares/multer-config');
const uploadImages = require('../middlewares/uploadImages').uploadImages;
const deleteImages = require('../middlewares/deleteImages').deleteImages;
const auth = require('../middlewares/auth');

const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/webp', 'image/jpeg'];

// Seuls les PNG, WebP (transparence conservée) et JPEG sont acceptés pour la photo d'un objet.
function acceptObjectImageTypes(req, res, next) {
    const file = req.files?.object?.[0];

    if (file && !ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
        return res.status(400).json({ error: 'Format de photo non accepté : utiliser un PNG, un WebP ou un JPEG.' });
    }
    next();
}

const uploadObjectImage = [
    multer.fields([{ name: 'object', maxCount: 1 }]),
    acceptObjectImageTypes,
    uploadImages,
];

router.get('/',
            curiosityItemsCtrl.getAllCuriosityItems);

router.post('/',
            auth,
            uploadObjectImage,
            curiosityItemsCtrl.createCuriosityItem,
            deleteImages);

// Avant « /:id », sinon « order » serait pris pour un identifiant.
router.put ('/order',
            auth,
            curiosityItemsCtrl.reorderCuriosityItems);

router.put ('/:id',
            auth,
            uploadObjectImage,
            curiosityItemsCtrl.updateOneCuriosityItem,
            deleteImages);

router.delete ('/:id',
            auth,
            curiosityItemsCtrl.deleteOneCuriosityItem,
            deleteImages);

module.exports = router;
