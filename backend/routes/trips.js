const express = require ('express');
const router = express.Router();
const tripsCtrl = require ('../controllers/trips');
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');
const uploadImages = require('../middlewares/uploadImages').uploadImages;
const deleteImages = require('../middlewares/deleteImages').deleteImages;

// Cette partie du code définit un  **** MIDDLEWARE **** pour notre application Express. 
// Un middleware est une fonction qui peut être utilisée pour effectuer des actions sur une requête avant qu'elle n'atteigne sa route finale.
// Dans ce cas, le middleware est défini à l'aide de app.use(), qui indique à Express d'utiliser ce middleware pour toutes les requêtes entrantes. 
// Le middleware prend deux arguments, req (pour la requête) et res (pour la réponse). 
// Dans cet exemple, il envoie une réponse JSON contenant le message "Votre requête a bien été reçue !" à chaque requête entrante.
// l'argument next permet de passer au middleware suivant

router.post('/',
            // auth,
            // multer.array('images'), 
            multer.fields([
                { name: 'images'},
                { name: 'sketches'},
                { name: 'trips'}
              ]),
            uploadImages, 
            tripsCtrl.createTrip);
            
router.get('/',
            tripsCtrl.getAllTrips);

router.get('/:id', 
            tripsCtrl.getOneTrip);

router.delete ('/:id',
            // auth, 
            tripsCtrl.deleteOneTrip, 
            deleteImages);

router.put ('/:id',
            // auth, 
            multer.fields([
                { name: 'images'},
                { name: 'sketches'},
                { name: 'trips'}
              ]),
            uploadImages, 
            tripsCtrl.updateOneTrip, 
            deleteImages);

module.exports = router;