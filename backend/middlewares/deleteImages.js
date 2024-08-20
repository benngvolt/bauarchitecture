const { storage, bucket } = require('../config/storage');
const Project = require('../models/project')

async function deleteImages(req) {
    // Obtenez la liste des URLs des images depuis Google Cloud Storage
    
    async function getCloudImageUrls() {
      const [files] = await bucket.getFiles({ prefix: 'projects_images/' });
      return files.map((file) => `https://storage.googleapis.com/${bucket.name}/${file.name}`);
    }

    async function getCloudSketchUrls() {
      const [sketchFiles] = await bucket.getFiles({ prefix: 'projects_sketches/' });
      return sketchFiles.map((file) => `https://storage.googleapis.com/${bucket.name}/${file.name}`);
    }
      
    // Obtenez la liste des URLs des images depuis MongoDB
    async function getDbImageUrls() {
      // Récupérez toutes les séries depuis MongoDB
      const projects = await Project.find();
      const imageUrls = projects.flatMap((project) => project.images.map((image) => decodeURIComponent(image.imageUrl.replace(/\+/g, ' '))));
      return imageUrls;
    }

    // Obtenez la liste des URLs des images depuis MongoDB
    async function getDbSketchUrls() {
      // Récupérez toutes les séries depuis MongoDB
      const projects = await Project.find();
      const sketchUrls = projects.flatMap((project) => project.sketches.map((sketch) => decodeURIComponent(sketch.imageUrl.replace(/\+/g, ' '))));
      return sketchUrls;
    }
  
    try {
      const cloudImageUrls = await getCloudImageUrls(); // Utilisez "await" pour attendre la résolution de la promesse
      const dbImageUrls = await getDbImageUrls();     
      const imagesToDelete = cloudImageUrls.filter((url) => !dbImageUrls.includes(url));    
      // Suppression des images non référencées dans le cloud
      for (const imageUrl of imagesToDelete) {
        // Divisez l'URL en parties en utilisant "/" comme séparateur
        const parts = imageUrl.split('/');
        // Récupérez la dernière partie qui contient le nom du fichier
        const fileToDeleteName = parts.pop();
        if (fileToDeleteName) {
          await bucket.file('projects_images/' + fileToDeleteName).delete();
        }
      }
      
    } catch (error) {
      console.error(error.message);
    }
    
    try {    
      const cloudSketchUrls = await getCloudSketchUrls();
      const dbSketchUrls = await getDbSketchUrls(); // Utilisez "await" pour attendre la résolution de la promesse
      const sketchesToDelete = cloudSketchUrls.filter((url) => !dbSketchUrls.includes(url));
      // Suppression des images non référencées dans le cloud
      for (const sketchUrl of sketchesToDelete) {
        // Divisez l'URL en parties en utilisant "/" comme séparateur
        const parts = sketchUrl.split('/');
        // Récupérez la dernière partie qui contient le nom du fichier
        const fileToDeleteName = parts.pop();
        if (fileToDeleteName) {
          await bucket.file('projects_sketches/' + fileToDeleteName).delete();
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  }

module.exports = {
    deleteImages
  };