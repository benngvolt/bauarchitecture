// const { storage, bucket } = require('../config/storage');
//  // should be your bucket name
// const sharp = require('sharp')
// const { format } = require('url'); 


// function uploadImages(req, res, next) {
//   const newImagesObjects = [];
//   const newSketchesObjects = [];
//   const newTripsObjects = [];
//   const newDrawingsObjects = [];

//   const fileIndexes = req.body.fileIndexes;
//   const sketchFileIndexes = req.body.sketchFileIndexes;
//   const tripFileIndexes = req.body.tripFileIndexes;
//   const drawingFileIndexes = req.body.drawingFileIndexes;

//   const images = req.files['images'] || [];
//   const sketches = req.files['sketches'] || [];
//   const trips = req.files['trips'] || [];
//   const drawings = req.files['drawings'] || [];
  
  
//   if ((!images || images.length === 0) && (!sketches || sketches.length === 0) && (!trips || trips.length === 0) && (!drawings || drawings.length === 0)) {
//     // Aucune image n'a été téléchargée, appeler next() et sortir de la fonction
//     return next();
//   }
  
//   // Créez un tableau de promesses pour gérer chaque fichier individuellement
//   const uploadPromises = images?.map((file, index) => {
//     return new Promise(async(resolve, reject) => {
//       try {
//         const { originalname, buffer } = file;
//         // Redimensionnez et convertissez l'image avec Sharp
//         const resizedImageBuffer = await sharp(buffer)
          
//           .resize({
//             width: 1500,
//             fit: 'cover',
//             kernel: 'lanczos3',
//           })
//           .webp({ lossless: true })
//           .toBuffer();
  
//         // Créez un blob dans le stockage Google Cloud Storage
//         const blob = bucket.file('projects_images/' + originalname);
//         const blobStream = blob.createWriteStream({
//           resumable: false
//         });
  
//         blobStream.on('finish', () => {
//           const publicUrl = format(
//             `https://storage.googleapis.com/${bucket.name}/${blob.name}`
//           );
  
//           // Pousser les données dans le tableau newImagesObject
//           if (fileIndexes) {
//             newImagesObjects.push({
//               imageUrl: publicUrl,
//               index: JSON.parse(fileIndexes[index])
//             });
//           } else {
//             newImagesObjects.push({
//               imageUrl: publicUrl,
//             });
//           }

//           // Continuer avec la prochaine promesse
//           resolve(publicUrl);
//         }).on('error', () => {
//           reject(`Unable to upload image: ${originalname}`);
//         }).end(resizedImageBuffer);
//       } catch (error) {
//         console.error(`Erreur lors du traitement de l'image ${file.originalname}:`, error);
//         reject(`Unable to process image: ${file.originalname}`);
//       }
//     })
//   });


//   // Créez un tableau de promesses pour gérer chaque fichier individuellement
//   const uploadSketchPromises = sketches?.map( (file, index) => {
//     return new Promise(async(resolve, reject) => {
//       try {
//         const { originalname, buffer } = file;
//         // Redimensionnez et convertissez l'image avec Sharp
//         const resizedImageBuffer = await sharp(buffer)
          
//           .resize({
//             width: 1500,
//             fit: 'cover',
//             kernel: 'lanczos3',
//           })
//           .webp({ lossless: true })
//           .toBuffer();
  
//         // Créez un blob dans le stockage Google Cloud Storage
//         const blob = bucket.file('projects_sketches/' + originalname);
//         const blobStream = blob.createWriteStream({
//           resumable: false
//         });
  
//         blobStream.on('finish', () => {
//           const publicUrl = format(
//             `https://storage.googleapis.com/${bucket.name}/${blob.name}`
//           );
  
//           // Pousser les données dans le tableau newImagesObject
//           if (sketchFileIndexes) {
//             newSketchesObjects.push({
//               imageUrl: publicUrl,
//               index: JSON.parse(sketchFileIndexes[index])
//             });
//           } else {
//             newSketchesObjects.push({
//               imageUrl: publicUrl,
//             });
//           }

//           // Continuer avec la prochaine promesse
//           resolve(publicUrl);
//         }).on('error', () => {
//           reject(`Unable to upload image: ${originalname}`);
//         }).end(resizedImageBuffer);
//       } catch (error) {
//         // Gérez les erreurs ici...
//         reject(`Unable to process image: ${file.originalname}`);
//       }
//     })
//   });

//   // Créez un tableau de promesses pour gérer chaque fichier individuellement
//   const uploadTripPromises = trips?.map((file, index) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const { originalname, buffer } = file;
//         // Redimensionnez et convertissez l'image avec Sharp
//         const resizedImageBuffer = await sharp(buffer)
//           .resize({
//             width: 1500,
//             fit: 'cover',
//             kernel: 'lanczos3',
//           })
//           .webp({ lossless: true })
//           .toBuffer();
  
//         // Créez un blob dans le stockage Google Cloud Storage
//         const blob = bucket.file('trips/' + originalname);
//         const blobStream = blob.createWriteStream({
//           resumable: false
//         });
  
//         blobStream.on('finish', () => {
//           const publicUrl = format(
//             `https://storage.googleapis.com/${bucket.name}/${blob.name}`
//           );
  
//           // Pousser les données dans le tableau newTripsObjects
//           if (tripFileIndexes) {
//             newTripsObjects.push({
//               imageUrl: publicUrl,
//               index: JSON.parse(tripFileIndexes[index])
//             });
//           } else {
//             newTripsObjects.push({
//               imageUrl: publicUrl,
//             });
//           }
  
//           // Continuer avec la prochaine promesse
//           resolve(publicUrl);
//         }).on('error', (err) => {
//           console.error(`Erreur lors de l'upload de ${originalname}:`, err);
//           reject(`Unable to upload image: ${originalname}`);
//         }).end(resizedImageBuffer);
//       } catch (error) {
//         console.error(`Erreur lors du traitement de l'image ${file.originalname}:`, error);
//         reject(`Unable to process image: ${file.originalname}`);
//       }
//     })
//   });

//   // Créez un tableau de promesses pour gérer chaque fichier individuellement
//   const uploadDrawingPromises = drawings?.map((file, index) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const { originalname, buffer } = file;
//         // Redimensionnez et convertissez l'image avec Sharp
//         const resizedImageBuffer = await sharp(buffer)
//           .resize({
//             width: 1500,
//             fit: 'cover',
//             kernel: 'lanczos3',
//           })
//           .webp({ lossless: true })
//           .toBuffer();
  
//         // Créez un blob dans le stockage Google Cloud Storage
//         const blob = bucket.file('drawings/' + originalname);
//         const blobStream = blob.createWriteStream({
//           resumable: false
//         });
  
//         blobStream.on('finish', () => {
//           const publicUrl = format(
//             `https://storage.googleapis.com/${bucket.name}/${blob.name}`
//           );
  
//           // Pousser les données dans le tableau newTripsObjects
//           if (drawingFileIndexes) {
//             newDrawingsObjects.push({
//               imageUrl: publicUrl,
//               index: JSON.parse(tripFileIndexes[index])
//             });
//           } else {
//             newDrawingsObjects.push({
//               imageUrl: publicUrl,
//             });
//           }
  
//           // Continuer avec la prochaine promesse
//           resolve(publicUrl);
//         }).on('error', (err) => {
//           console.error(`Erreur lors de l'upload de ${originalname}:`, err);
//           reject(`Unable to upload drawing: ${originalname}`);
//         }).end(resizedImageBuffer);
//       } catch (error) {
//         console.error(`Erreur lors du traitement de l'image ${file.originalname}:`, error);
//         reject(`Unable to process image: ${file.originalname}`);
//       }
//     })
//   });

//   // Utilisez Promise.all pour attendre que toutes les promesses d'upload se terminent
//  // Utilisez Promise.all pour attendre que toutes les promesses d'upload se terminent
//     Promise.all([...uploadPromises, ...uploadSketchPromises, ...uploadTripPromises, ...uploadDrawingPromises])
//     .then(() => {
//       // Stockez newImagesObjects et newSketchesObjects dans l'objet req
//       req.newImagesObjects = newImagesObjects;
//       req.newSketchesObjects = newSketchesObjects;
//       req.newTripsObjects = newTripsObjects;
//       req.newDrawingsObjects = newDrawingsObjects;
//       next(); // Passez au middleware suivant ou à la route
//     })
//     .catch((error) => {
//       // Gérez les erreurs ici...
//       res.status(500).json({ error: 'Erreur lors du traitement des images.' });
//     });
// };

// module.exports = {
//   uploadImages,
// };

const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const uploadRoot = path.join(__dirname, "../uploads");

const folders = {
  images: "projects_images",
  sketches: "projects_sketches",
  trips: "trips",
  drawings: "drawings",
};

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function safeFileName(originalname) {
  const ext = ".webp";
  const baseName = path
    .parse(originalname)
    .name
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "");

  return `${Date.now()}_${uuidv4()}_${baseName}${ext}`;
}

function parseIndex(indexes, index) {
  if (!indexes) return undefined;

  try {
    return JSON.parse(indexes[index]);
  } catch {
    return undefined;
  }
}

async function processAndSaveImage(file, folder, indexes, index) {
  const outputDir = path.join(uploadRoot, folder);
  await ensureDir(outputDir);

  const filename = safeFileName(file.originalname);
  const outputPath = path.join(outputDir, filename);

  await sharp(file.buffer)
    .resize({
      width: 1500,
      fit: "cover",
      kernel: "lanczos3",
    })
    .webp({ lossless: true })
    .toFile(outputPath);

  const imageUrl = `/uploads/${folder}/${filename}`;

  const parsedIndex = parseIndex(indexes, index);

  if (parsedIndex !== undefined) {
    return {
      imageUrl,
      index: parsedIndex,
    };
  }

  return { imageUrl };
}

async function uploadImages(req, res, next) {
  try {
    const images = req.files?.images || [];
    const sketches = req.files?.sketches || [];
    const trips = req.files?.trips || [];
    const drawings = req.files?.drawings || [];

    if (
      images.length === 0 &&
      sketches.length === 0 &&
      trips.length === 0 &&
      drawings.length === 0
    ) {
      return next();
    }

    const [
      newImagesObjects,
      newSketchesObjects,
      newTripsObjects,
      newDrawingsObjects,
    ] = await Promise.all([
      Promise.all(
        images.map((file, index) =>
          processAndSaveImage(file, folders.images, req.body.fileIndexes, index)
        )
      ),
      Promise.all(
        sketches.map((file, index) =>
          processAndSaveImage(
            file,
            folders.sketches,
            req.body.sketchFileIndexes,
            index
          )
        )
      ),
      Promise.all(
        trips.map((file, index) =>
          processAndSaveImage(
            file,
            folders.trips,
            req.body.tripFileIndexes,
            index
          )
        )
      ),
      Promise.all(
        drawings.map((file, index) =>
          processAndSaveImage(
            file,
            folders.drawings,
            req.body.drawingFileIndexes,
            index
          )
        )
      ),
    ]);

    req.newImagesObjects = newImagesObjects;
    req.newSketchesObjects = newSketchesObjects;
    req.newTripsObjects = newTripsObjects;
    req.newDrawingsObjects = newDrawingsObjects;

    next();
  } catch (error) {
    console.error("Erreur lors du traitement des images :", error);
    res.status(500).json({
      error: "Erreur lors du traitement des images.",
      details: error.message,
    });
  }
}

module.exports = {
  uploadImages,
};