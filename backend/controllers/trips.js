const Trip = require('../models/trip')
const { storage, bucket } = require('../config/storage');

/*------------------------
----- GET ALL TRIPS ---
-------------------------*/

exports.getAllTrips = (req, res) => {
    Trip.find()
      .then (trips =>res.status(200).json(trips))
      .catch (error => res.status (400).json({error}))
  }

// /*------------------------
// ----- GET ONE TRIP ----
// -------------------------*/

exports.getOneTrip = (req, res) => {
  Trip.findOne({_id: req.params.id})
    .then (trip =>res.status(200).json(trip))
    .catch (error => res.status (400).json({error}))
}


/*--------------------------
----- DELETE ONE TRIP -----
--------------------------*/

exports.deleteOneTrip = async (req, res, next) => {
  try {
    const deletedTrip = await Trip.findOneAndDelete({ _id: req.params.id });
    if (!deletedTrip) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }
    // const projects = await Project.find();
    // const imageUrls = projects.flatMap((project) => project.images.map((image) => image.imageUrl));
    // Appeler la fonction de suppression d'images après avoir supprimé la série
    res.status(200).json({ message: 'Voyage supprimé !' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression du voyage' });
  }
};


/*------------------------
----- CREATE TRIP -----
------------------------*/

exports.createTrip = async (req, res) => {
    
    const tripData = req.body;
    const trips = req.newTripsObjects;
  
    const descriptionWithBr = req.body.description
  
    if (!tripData.title) {
      return res.status(400).json({ error: 'Le champ "title" est manquant dans la demande.' });
    }
  
    try {
      // if (serieImages.length === req.newImagesObjects.length) {
        // Si toutes les images ont été traitées, créez une nouvelle instance du modèle Serie
        const trip = new Trip({
          ... tripData,
          description: descriptionWithBr,
          trips: trips,
        });
        await trip.save();
        res.status(201).json({ message: 'Voyage enregistré !' });
      // }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error });
    }
  };

/*--------------------------
----- UPDATE ONE TRIP -----
--------------------------*/

exports.updateOneTrip = async (req, res, next) => {

    // MODIFICATION DU PROJET
    try {
      // RÉCUPÉRATION DU PROJET CONCERNÉ VIA SON ID STOCKÉ EN PARAMÈTRES D'URL
      const trip = await Trip.findOne({ _id: req.params.id });

      // SI LE PROJET N'EXISTE PAS, ON RETOURNE UNE ERREUR 404
      if (!trip) {
        return res.status(404).json({ error: 'Voyage non trouvé' });
      }

      const tripData = req.body;
      const descriptionWithBr = req.body.description;

      // RÉCUPÉRATION DES IMAGES EXISTANTES DEPUIS LE FRONTEND, PARSE DES DONNÉES
      const existingTrips = req.body.existingTrips || [];
      const existingTripsObjects = existingTrips.map((tripStr) => JSON.parse(tripStr));

      async function processAndSortTrips(existingTripsObjects, newTripsObjects) {
        const allTrips = existingTripsObjects.map((trip, index) => ({
          imageUrl: trip.imageUrl,
          index,
        })).concat(newTripsObjects);
        allTrips.sort((a, b) => a.index - b.index);
        const updatedTrips = allTrips.filter((trip) => trip != null && trip !== "empty");
        return updatedTrips;
      }

      // MISE À JOUR DE LA SÉRIE DANS LA BASE DE DONNÉES
      async function updateTrip(updatedTrips) {
        const updatedMainTripIndex = req.body.mainTripIndex || 0;
    
        if (!tripData.title) {
          return res.status(400).json({ error: 'Le champ "title" est manquant dans la demande.' });
        }
        
        const tripObject = {
          ...tripData,
          description: descriptionWithBr,     
          mainTripIndex: updatedMainTripIndex,
          trips: updatedTrips,
        };
  
        await Trip.updateOne({ _id: req.params.id }, tripObject);
        console.log('Trip updated successfully');
        res.status(200).json({ message: 'Voyage modifié' });
        next();
        // À ce stade, vous pouvez appeler d'autres fonctions si nécessaire
      }
  
      const newTripsObjects = req.newTripsObjects || [];
    
      const updatedTrips = await processAndSortTrips(existingTripsObjects, newTripsObjects);

      await updateTrip (updatedTrips);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la série.' });
    }
  };
