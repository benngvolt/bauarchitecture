/*-----------------------------------------------------------

CONSTANTES et IMPORTS

-----------------------------------------------------------*/

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const SECRET_MONGODBKEY = process.env.SECRET_MONGODBKEY;
// Nouvelle instance de l'application Express, pour configurer notre serveur et définir les routes et les middlewares.


/* --------------------------------------------------------

----------- A CONFIGURER ----------------------------------

----------------------------------------------------------*/


const projectsRoutes = require('./routes/projects');
const articlesRoutes = require('./routes/articles');
const drawingsRoutes = require('./routes/drawings');
const reassuranceItemsRoutes = require('./routes/reassuranceItems');
const heroSettingsRoutes = require('./routes/heroSettings');
const processStepsRoutes = require('./routes/processSteps');
const aboutPageContentRoutes = require('./routes/aboutPageContent');
const friendUrlsRoutes = require('./routes/friendUrls');
const faqItemsRoutes = require('./routes/faqItems');
const featuredProjectsRoutes = require('./routes/featuredProjects');
const approachSettingsRoutes = require('./routes/approachSettings');
const homeBannerRoutes = require('./routes/homeBanner');
const processSettingsRoutes = require('./routes/processSettings');
const missionsSettingsRoutes = require('./routes/missionsSettings');
const curiosityItemsRoutes = require('./routes/curiosityItems');
const siteSettingsRoutes = require('./routes/siteSettings');
const usersRoutes = require('./routes/users');


/* --------------------------------------------------------

----------- A CONFIGURER ----------------------------------

----------------------------------------------------------*/


const path = require('path');

// Connexion à mongoose avec l'adresse srv donnée lors de la création du cluster contenant le password
mongoose.connect(SECRET_MONGODBKEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connexion à MongoDB réussie !');
})
.catch((error) => {
  console.error('Connexion à MongoDB échouée !');
  console.error(error.message);
});


/*-----------------------------------------------------------

MIDDLEWARES

-----------------------------------------------------------*/


// PREMIER MIDDLEWARE POUR GÉRER LES PROBLEMES DE CORS ORIGIN
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});


// Le serveur est derrière un proxy (App Engine, nginx) : req.ip doit être l'adresse du visiteur (limiteur de tentatives de connexion).
app.set('trust proxy', true);

// pour parser les requêtes
app.use(express.json());


/* --------------------------------------------------------

----------- A CONFIGURER ----------------------------------

----------------------------------------------------------*/


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/projects', projectsRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/drawings', drawingsRoutes);
app.use('/api/reassurance-items', reassuranceItemsRoutes);
app.use('/api/hero-settings', heroSettingsRoutes);
app.use('/api/process-steps', processStepsRoutes);
app.use('/api/about-page-content', aboutPageContentRoutes);
app.use('/api/friend-urls', friendUrlsRoutes);
app.use('/api/faq-items', faqItemsRoutes);
app.use('/api/featured-projects', featuredProjectsRoutes);
app.use('/api/approach-settings', approachSettingsRoutes);
app.use('/api/home-banner', homeBannerRoutes);
app.use('/api/process-settings', processSettingsRoutes);
app.use('/api/missions-settings', missionsSettingsRoutes);
app.use('/api/curiosity-items', curiosityItemsRoutes);
app.use('/api/site-settings', siteSettingsRoutes);
app.use('/api/users', usersRoutes);


/* --------------------------------------------------------

----------- A CONFIGURER ----------------------------------

----------------------------------------------------------*/


module.exports = app;