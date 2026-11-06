const express = require ('express');
const router = express.Router();
const processStepsCtrl = require ('../controllers/processSteps');
const auth = require('../middlewares/auth');

router.get('/',
            processStepsCtrl.getAllProcessSteps);

router.put ('/:id',
            auth,
            processStepsCtrl.updateOneProcessStep);

module.exports = router;
