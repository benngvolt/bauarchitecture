const { storage, bucket } = require('../config/storage');
 // should be your bucket name
const sharp = require('sharp')
const { format } = require('url'); 


function uploadImages(req, res, next) {
  const newImagesObjects = [];
  const newSketchesObjects = [];
  const fileIndexes = req.body.fileIndexes;
  const sketchFileIndexes = req.body.sketchFileIndexes;
  const images = req.files['images'] || [];
  const sketches = req.files['sketches'] || [];
  
  
  if ((!images || images.length === 0) && (!sketches || sketches.length === 0) ) {
    // Aucune image n'a été téléchargée, appeler next() et sortir de la fonction
    return next();
  }
  
  // Créez un tableau de promesses pour gérer chaque fichier individuellement
  const uploadPromises = images?.map((file, index) => {
    return new Promise(async(resolve, reject) => {
      try {
        const { originalname, buffer } = file;
        // Redimensionnez et convertissez l'image avec Sharp
        const resizedImageBuffer = await sharp(buffer)
          
          .resize({
            width: 1500,
            fit: 'cover',
            kernel: 'lanczos3',
          })
          .webp({ lossless: true })
          .toBuffer();
  
        // Créez un blob dans le stockage Google Cloud Storage
        const blob = bucket.file('projects_images/' + originalname);
        const blobStream = blob.createWriteStream({
          resumable: false
        });
  
        blobStream.on('finish', () => {
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          );
  
          // Pousser les données dans le tableau newImagesObject
          if (fileIndexes) {
            newImagesObjects.push({
              imageUrl: publicUrl,
              index: JSON.parse(fileIndexes[index])
            });
          } else {
            newImagesObjects.push({
              imageUrl: publicUrl,
            });
          }

          // Continuer avec la prochaine promesse
          resolve(publicUrl);
        }).on('error', () => {
          reject(`Unable to upload image: ${originalname}`);
        }).end(resizedImageBuffer);
      } catch (error) {
        // Gérez les erreurs ici...
        reject(`Unable to process image: ${file.originalname}`);
      }
    })
  });


  // Créez un tableau de promesses pour gérer chaque fichier individuellement
  const uploadSketchPromises = sketches?.map( (file, index) => {
    return new Promise(async(resolve, reject) => {
      try {
        const { originalname, buffer } = file;
        // Redimensionnez et convertissez l'image avec Sharp
        const resizedImageBuffer = await sharp(buffer)
          
          .resize({
            width: 1500,
            fit: 'cover',
            kernel: 'lanczos3',
          })
          .webp({ lossless: true })
          .toBuffer();
  
        // Créez un blob dans le stockage Google Cloud Storage
        const blob = bucket.file('projects_sketches/' + originalname);
        const blobStream = blob.createWriteStream({
          resumable: false
        });
  
        blobStream.on('finish', () => {
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          );
  
          // Pousser les données dans le tableau newImagesObject
          if (sketchFileIndexes) {
            newSketchesObjects.push({
              imageUrl: publicUrl,
              index: JSON.parse(sketchFileIndexes[index])
            });
          } else {
            newSketchesObjects.push({
              imageUrl: publicUrl,
            });
          }

          // Continuer avec la prochaine promesse
          resolve(publicUrl);
        }).on('error', () => {
          reject(`Unable to upload image: ${originalname}`);
        }).end(resizedImageBuffer);
      } catch (error) {
        // Gérez les erreurs ici...
        reject(`Unable to process image: ${file.originalname}`);
      }
    })
  });

  // Utilisez Promise.all pour attendre que toutes les promesses d'upload se terminent
 // Utilisez Promise.all pour attendre que toutes les promesses d'upload se terminent
    Promise.all([...uploadPromises, ...uploadSketchPromises])
    .then(() => {
      // Stockez newImagesObjects et newSketchesObjects dans l'objet req
      req.newImagesObjects = newImagesObjects;
      req.newSketchesObjects = newSketchesObjects;
      next(); // Passez au middleware suivant ou à la route
    })
    .catch((error) => {
      // Gérez les erreurs ici...
      res.status(500).json({ error: 'Erreur lors du traitement des images ou croquis.' });
    });
};

module.exports = {
  uploadImages,
};