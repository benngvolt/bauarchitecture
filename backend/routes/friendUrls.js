const express = require ('express');
const router = express.Router();
const friendUrlsCtrl = require ('../controllers/friendUrls');
const auth = require('../middlewares/auth');

router.get('/',
            friendUrlsCtrl.getAllFriendUrls);

router.post('/',
            auth,
            friendUrlsCtrl.createFriendUrl);

router.put ('/:id',
            auth,
            friendUrlsCtrl.updateOneFriendUrl);

router.delete ('/:id',
            auth,
            friendUrlsCtrl.deleteOneFriendUrl);

module.exports = router;
