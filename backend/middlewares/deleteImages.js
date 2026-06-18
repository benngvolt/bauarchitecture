// const { storage, bucket } = require('../config/storage');
// const Project = require('../models/project')
// const Trip = require('../models/trip')
// const Drawing = require('../models/drawing')

// async function deleteImages(req) {
//     // Obtenez la liste des URLs des images depuis Google Cloud Storage
    
//     async function getCloudImageUrls() {
//       const [files] = await bucket.getFiles({ prefix: 'projects_images/' });
//       return files.map((file) => `https://storage.googleapis.com/${bucket.name}/${file.name}`);
//     }

//     async function getCloudSketchUrls() {
//       const [sketchFiles] = await bucket.getFiles({ prefix: 'projects_sketches/' });
//       return sketchFiles.map((file) => `https://storage.googleapis.com/${bucket.name}/${file.name}`);
//     }

//     async function getCloudTripUrls() {
//       const [tripFiles] = await bucket.getFiles({ prefix: 'trips/' });
//       return tripFiles.map((file) => `https://storage.googleapis.com/${bucket.name}/${file.name}`);
//     }

//     async function getCloudDrawingUrls() {
//       const [drawingFiles] = await bucket.getFiles({ prefix: 'drawings/' });
//       return drawingFiles.map((file) => `https://storage.googleapis.com/${bucket.name}/${file.name}`);
//     }
      
//     // Obtenez la liste des URLs des images depuis MongoDB
//     async function getDbImageUrls() {
//       // Récupérez toutes les séries depuis MongoDB
//       const projects = await Project.find();
//       const imageUrls = projects.flatMap((project) => project.images.map((image) => decodeURIComponent(image.imageUrl.replace(/\+/g, ' '))));
//       return imageUrls;
//     }

//     // Obtenez la liste des URLs des images depuis MongoDB
//     async function getDbSketchUrls() {
//       // Récupérez toutes les séries depuis MongoDB
//       const projects = await Project.find();
//       const sketchUrls = projects.flatMap((project) => project.sketches.map((sketch) => decodeURIComponent(sketch.imageUrl.replace(/\+/g, ' '))));
//       return sketchUrls;
//     }

//     // Obtenez la liste des URLs des images depuis MongoDB
//     async function getDbTripUrls() {
//       // Récupérez toutes les séries depuis MongoDB
//       const trips = await Trip.find();
//       const tripUrls = trips.flatMap((trip) => trip.trips.map((trip) => decodeURIComponent(trip.imageUrl.replace(/\+/g, ' '))));
//       return tripUrls;
//     }

//     // Obtenez la liste des URLs des images depuis MongoDB
//     async function getDbDrawingUrls() {
//       // Récupérez toutes les séries depuis MongoDB
//       const drawings = await Drawing.find();
//       const drawingUrls = drawings.flatMap((drawing) => drawing.drawings.map((drawing) => decodeURIComponent(drawing.imageUrl.replace(/\+/g, ' '))));
//       return drawingUrls;
//     }
  
//     try {
//       const cloudImageUrls = await getCloudImageUrls(); // Utilisez "await" pour attendre la résolution de la promesse
//       const dbImageUrls = await getDbImageUrls();     
//       const imagesToDelete = cloudImageUrls.filter((url) => !dbImageUrls.includes(url));    
//       // Suppression des images non référencées dans le cloud
//       for (const imageUrl of imagesToDelete) {
//         // Divisez l'URL en parties en utilisant "/" comme séparateur
//         const parts = imageUrl.split('/');
//         // Récupérez la dernière partie qui contient le nom du fichier
//         const fileToDeleteName = parts.pop();
//         if (fileToDeleteName) {
//           await bucket.file('projects_images/' + fileToDeleteName).delete();
//         }
//       }
      
//     } catch (error) {
//       console.error(error.message);
//     }
    
//     try {    
//       const cloudSketchUrls = await getCloudSketchUrls();
//       const dbSketchUrls = await getDbSketchUrls(); // Utilisez "await" pour attendre la résolution de la promesse
//       const sketchesToDelete = cloudSketchUrls.filter((url) => !dbSketchUrls.includes(url));
//       // Suppression des images non référencées dans le cloud
//       for (const sketchUrl of sketchesToDelete) {
//         // Divisez l'URL en parties en utilisant "/" comme séparateur
//         const parts = sketchUrl.split('/');
//         // Récupérez la dernière partie qui contient le nom du fichier
//         const fileToDeleteName = parts.pop();
//         if (fileToDeleteName) {
//           await bucket.file('projects_sketches/' + fileToDeleteName).delete();
//         }
//       }
//     } catch (error) {
//       console.error(error.message);
//     }

//     try {    
//       const cloudTripUrls = await getCloudTripUrls();
//       const dbTripUrls = await getDbTripUrls(); // Utilisez "await" pour attendre la résolution de la promesse
//       const tripsToDelete = cloudTripUrls.filter((url) => !dbTripUrls.includes(url));
//       // Suppression des images non référencées dans le cloud
//       for (const tripUrl of tripsToDelete) {
//         // Divisez l'URL en parties en utilisant "/" comme séparateur
//         const parts = tripUrl.split('/');
//         // Récupérez la dernière partie qui contient le nom du fichier
//         const fileToDeleteName = parts.pop();
//         if (fileToDeleteName) {
//           await bucket.file('trips/' + fileToDeleteName).delete();
//         }
//       }
//     } catch (error) {
//       console.error(error.message);
//     }

//     try {    
//       const cloudDrawingUrls = await getCloudDrawingUrls();
//       const dbDrawingUrls = await getDbDrawingUrls(); // Utilisez "await" pour attendre la résolution de la promesse
//       const drawingsToDelete = cloudDrawingUrls.filter((url) => !dbDrawingUrls.includes(url));
//       // Suppression des images non référencées dans le cloud
//       for (const drawingUrl of drawingsToDelete) {
//         // Divisez l'URL en parties en utilisant "/" comme séparateur
//         const parts = drawingUrl.split('/');
//         // Récupérez la dernière partie qui contient le nom du fichier
//         const fileToDeleteName = parts.pop();
//         if (fileToDeleteName) {
//           await bucket.file('drawings/' + fileToDeleteName).delete();
//         }
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

// module.exports = {
//     deleteImages
//   };

const path = require("path");
const fs = require("fs/promises");

const Project = require("../models/project");
const Trip = require("../models/trip");
const Drawing = require("../models/drawing");

const uploadRoot = path.join(__dirname, "../uploads");

const folders = {
  images: "projects_images",
  sketches: "projects_sketches",
  trips: "trips",
  drawings: "drawings",
};

async function getLocalUrls(folder) {
  const dir = path.join(uploadRoot, folder);

  try {
    const files = await fs.readdir(dir);
    return files.map((filename) => `/uploads/${folder}/${filename}`);
  } catch {
    return [];
  }
}

function normalizeUrl(url) {
  return decodeURIComponent(url.replace(/\+/g, " "));
}

async function deleteUnusedFiles(folder, dbUrls) {
  const localUrls = await getLocalUrls(folder);
  const urlsToDelete = localUrls.filter((url) => !dbUrls.includes(url));

  for (const url of urlsToDelete) {
    const filename = path.basename(url);
    const filePath = path.join(uploadRoot, folder, filename);

    try {
      await fs.unlink(filePath);
      console.log("Image supprimée :", url);
    } catch (error) {
      console.error(`Erreur suppression ${url} :`, error.message);
    }
  }
}

async function deleteImages() {
  try {
    const projects = await Project.find();

    const dbImageUrls = projects.flatMap((project) =>
      project.images.map((image) => normalizeUrl(image.imageUrl))
    );

    const dbSketchUrls = projects.flatMap((project) =>
      project.sketches.map((sketch) => normalizeUrl(sketch.imageUrl))
    );

    await deleteUnusedFiles(folders.images, dbImageUrls);
    await deleteUnusedFiles(folders.sketches, dbSketchUrls);
  } catch (error) {
    console.error("Erreur nettoyage projects :", error.message);
  }

  try {
    const trips = await Trip.find();

    const dbTripUrls = trips.flatMap((trip) =>
      trip.trips.map((image) => normalizeUrl(image.imageUrl))
    );

    await deleteUnusedFiles(folders.trips, dbTripUrls);
  } catch (error) {
    console.error("Erreur nettoyage trips :", error.message);
  }

  try {
    const drawings = await Drawing.find();

    const dbDrawingUrls = drawings.flatMap((drawing) =>
      drawing.drawings.map((image) => normalizeUrl(image.imageUrl))
    );

    await deleteUnusedFiles(folders.drawings, dbDrawingUrls);
  } catch (error) {
    console.error("Erreur nettoyage drawings :", error.message);
  }
}

module.exports = {
  deleteImages,
};