const path = require("path");
const fs = require("fs/promises");

const Project = require("../models/project");
const Article = require("../models/article");
const Drawing = require("../models/drawing");
const HeroSettings = require("../models/heroSettings");
const PhilosophyContent = require("../models/philosophyContent");

const uploadRoot = path.join(__dirname, "../uploads");

const folders = {
  images: "projects_images",
  sketches: "projects_sketches",
  articles: "articles",
  drawings: "drawings",
  hero: "hero",
  philosophy: "philosophy",
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
    const articles = await Article.find();

    const dbArticleUrls = articles.flatMap((article) =>
      article.articles.map((image) => normalizeUrl(image.imageUrl))
    );

    await deleteUnusedFiles(folders.articles, dbArticleUrls);
  } catch (error) {
    console.error("Erreur nettoyage articles :", error.message);
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

  try {
    const heroSettings = await HeroSettings.findOne();

    const dbHeroUrls = heroSettings?.imageUrl
      ? [normalizeUrl(heroSettings.imageUrl)]
      : [];

    await deleteUnusedFiles(folders.hero, dbHeroUrls);
  } catch (error) {
    console.error("Erreur nettoyage hero :", error.message);
  }

  try {
    const philosophyContent = await PhilosophyContent.findOne();

    const dbPhilosophyUrls = philosophyContent?.imageUrl
      ? [normalizeUrl(philosophyContent.imageUrl)]
      : [];

    await deleteUnusedFiles(folders.philosophy, dbPhilosophyUrls);
  } catch (error) {
    console.error("Erreur nettoyage philosophy :", error.message);
  }
}

module.exports = {
  deleteImages,
};