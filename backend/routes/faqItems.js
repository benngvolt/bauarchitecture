const express = require ('express');
const router = express.Router();
const faqItemsCtrl = require ('../controllers/faqItems');

router.get('/',
            faqItemsCtrl.getAllFaqItems);

router.post('/',
            // auth,
            faqItemsCtrl.createFaqItem);

router.put ('/:id',
            // auth,
            faqItemsCtrl.updateOneFaqItem);

router.delete ('/:id',
            // auth,
            faqItemsCtrl.deleteOneFaqItem);

module.exports = router;
