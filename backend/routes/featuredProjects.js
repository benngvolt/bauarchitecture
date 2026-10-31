const express = require ('express');
const router = express.Router();
const featuredProjectsCtrl = require ('../controllers/featuredProjects');

router.get('/',
            featuredProjectsCtrl.getFeaturedProjects);

router.put('/',
            // auth,
            featuredProjectsCtrl.updateFeaturedProjects);

module.exports = router;
