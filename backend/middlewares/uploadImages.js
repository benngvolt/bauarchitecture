const { storage, bucket } = require('../config/storage');
 // should be your bucket name
const sharp = require('sharp')
const { format } = require('url'); 


function uploadImages(req, res, next) {
  const newImagesObjects = [];
  const fileIndexes = req.body.fileIndexes;
  const files = req.files;
  
  if (!files || files.length === 0) {
    
    // Aucune image n'a été téléchargée, appeler next() et sortir de la fonction
    return next();
  }
  
  // Créez un tableau de promesses pour gérer chaque fichier individuellement
  const uploadPromises = files.map( (file, index) => {
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

  // Utilisez Promise.all pour attendre que toutes les promesses d'upload se terminent
  Promise.all(uploadPromises)
    .then(() => {
      // Stockez newImagesObjects dans l'objet req pour qu'il soit disponible dans le contrôleur
      req.newImagesObjects = newImagesObjects;
      next(); // Passez au middleware suivant ou à la route
    })
    .catch((error) => {
      // Gérez les erreurs ici...
      res.status(500).json({ error: 'Erreur lors du traitement des images.' });
    });
};

module.exports = {
  uploadImages,
};