const Drawing = require('../models/drawing')
const { storage, bucket } = require('../config/storage');

/*------------------------
----- GET ALL DRAWINGS ---
-------------------------*/

exports.getAllDrawings = (req, res) => {
    Drawing.find()
      .then (drawings =>res.status(200).json(drawings))
      .catch (error => res.status (400).json({error}))
  }

// /*------------------------
// ----- GET ONE DRAWING ----
// -------------------------*/

exports.getOneDrawing = (req, res) => {
  Drawing.findOne({_id: req.params.id})
    .then (drawing =>res.status(200).json(drawing))
    .catch (error => res.status (400).json({error}))
}


/*--------------------------
----- DELETE ONE DRAWING -----
--------------------------*/

exports.deleteOneDrawing = async (req, res, next) => {
  try {
    const deletedDrawing = await Drawing.findOneAndDelete({ _id: req.params.id });
    if (!deletedDrawing) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }
    // const projects = await Project.find();
    // const imageUrls = projects.flatMap((project) => project.images.map((image) => image.imageUrl));
    // Appeler la fonction de suppression d'images après avoir supprimé la série
    res.status(200).json({ message: 'Dessin supprimé !' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression du dessin' });
  }
};


/*------------------------
----- CREATE DRAWING -----
------------------------*/

exports.createDrawing = async (req, res) => {
    
    const drawingData = req.body;
    const drawings = req.newDrawingsObjects;
  
    const descriptionWithBr = req.body.description
  
    if (!drawingData.title) {
      return res.status(400).json({ error: 'Le champ "title" est manquant dans la demande.' });
    }
  
    try {
      // if (serieImages.length === req.newImagesObjects.length) {
        // Si toutes les images ont été traitées, créez une nouvelle instance du modèle Serie
        const drawing = new Drawing({
          ... drawingData,
          description: descriptionWithBr,
          drawings: drawings,
        });
        await drawing.save();
        res.status(201).json({ message: 'Dessin enregistré !' });
      // }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error });
    }
  };

/*--------------------------
----- UPDATE ONE DRAWING -----
--------------------------*/

exports.updateOneDrawing = async (req, res, next) => {

    // MODIFICATION DU PROJET
    try {
      // RÉCUPÉRATION DU PROJET CONCERNÉ VIA SON ID STOCKÉ EN PARAMÈTRES D'URL
      const drawing = await Drawing.findOne({ _id: req.params.id });

      // SI LE PROJET N'EXISTE PAS, ON RETOURNE UNE ERREUR 404
      if (!drawing) {
        return res.status(404).json({ error: 'Dessin non trouvé' });
      }

      const drawingData = req.body;
      const descriptionWithBr = req.body.description;

      // RÉCUPÉRATION DES IMAGES EXISTANTES DEPUIS LE FRONTEND, PARSE DES DONNÉES
      const existingDrawings = req.body.existingDrawings || [];
      const existingDrawingsObjects = existingDrawings.map((drawingStr) => JSON.parse(drawingStr));

      async function processAndSortDrawings(existingDrawingsObjects, newDrawingsObjects) {
        const allDrawings = existingDrawingsObjects.map((drawing, index) => ({
          imageUrl: drawing.imageUrl,
          index,
        })).concat(newDrawingsObjects);
        allDrawings.sort((a, b) => a.index - b.index);
        const updatedDrawings = allDrawings.filter((drawing) => drawing != null && drawing !== "empty");
        return updatedDrawings;
      }

      // MISE À JOUR DE LA SÉRIE DANS LA BASE DE DONNÉES
      async function updateDrawing(updatedDrawings) {
        const updatedMainDrawingIndex = req.body.mainDrawingIndex || 0;
    
        if (!drawingData.title) {
          return res.status(400).json({ error: 'Le champ "title" est manquant dans la demande.' });
        }
        
        const drawingObject = {
          ...drawingData,
          description: descriptionWithBr,     
          mainDrawingIndex: updatedMainDrawingIndex,
          drawings: updatedDrawings,
        };
  
        await Drawing.updateOne({ _id: req.params.id }, drawingObject);
        console.log('Drawing updated successfully');
        res.status(200).json({ message: 'Dessin modifié' });
        next();
        // À ce stade, vous pouvez appeler d'autres fonctions si nécessaire
      }
  
      const newDrawingsObjects = req.newDrawingsObjects || [];
    
      const updatedDrawings = await processAndSortDrawings(existingDrawingsObjects, newDrawingsObjects);

      await updateDrawing (updatedDrawings);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la série.' });
    }
  };
