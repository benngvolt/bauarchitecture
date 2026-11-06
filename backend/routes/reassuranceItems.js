const express = require ('express');
const router = express.Router();
const reassuranceItemsCtrl = require ('../controllers/reassuranceItems');
const auth = require('../middlewares/auth');

router.get('/',
            reassuranceItemsCtrl.getAllReassuranceItems);

router.post('/',
            auth,
            reassuranceItemsCtrl.createReassuranceItem);

router.put ('/:id',
            auth,
            reassuranceItemsCtrl.updateOneReassuranceItem);

router.delete ('/:id',
            auth,
            reassuranceItemsCtrl.deleteOneReassuranceItem);

module.exports = router;
