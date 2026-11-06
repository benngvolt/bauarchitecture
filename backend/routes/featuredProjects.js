const express = require ('express');
const router = express.Router();
const featuredProjectsCtrl = require ('../controllers/featuredProjects');
const auth = require('../middlewares/auth');

router.get('/',
            featuredProjectsCtrl.getFeaturedProjects);

router.put('/',
            auth,
            featuredProjectsCtrl.updateFeaturedProjects);

module.exports = router;
