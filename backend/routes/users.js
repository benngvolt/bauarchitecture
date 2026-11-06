const express = require ('express');
const router = express.Router();
const usersCtrl = require ('../controllers/users');
const auth = require('../middlewares/auth');
const loginRateLimit = require('../middlewares/loginRateLimit');

// Pas d'inscription par l'API : le compte est créé en base avec scripts/createAdminUser.js.
router.post('/', loginRateLimit, usersCtrl.logIn);

router.get('/check', auth, usersCtrl.checkToken);

module.exports = router;
