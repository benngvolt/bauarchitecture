const path = require("path");
const fs = require("fs/promises");

const Project = require("../models/project");
const Article = require("../models/article");
const Drawing = require("../models/drawing");
const HeroSettings = require("../models/heroSettings");
const AboutPageContent = require("../models/aboutPageContent");
const HomeBanner = require("../models/homeBanner");
const CuriosityItem = require("../models/curiosityItem");

const uploadRoot = path.join(__dirname, "../uploads");

// Un fichier envoyé il y a moins d'une minute n'est jamais supprimé : il peut appartenir à une requête en cours,
// dont le document n'est pas encore enregistré en base (sinon un nettoyage lancé par une autre requête l'effacerait).
const RECENT_FILE_GRACE_MS = 60 * 1000;

const folders = {
  images: "projects_images",
  sketches: "projects_sketches",
  articles: "articles",
  drawings: "drawings",
  hero: "hero",
  banner: "banner",
  philosophy: "philosophy",
  about: "about",
  curiosities: "curiosities",
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
      const { mtimeMs } = await fs.stat(filePath);
      if (Date.now() - mtimeMs < RECENT_FILE_GRACE_MS) {
        continue;
      }

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

    const dbHeroUrls = [
      ...(heroSettings?.images || []).map((image) => normalizeUrl(image.imageUrl)),
      ...(heroSettings?.imageUrl ? [normalizeUrl(heroSettings.imageUrl)] : []),
    ];

    await deleteUnusedFiles(folders.hero, dbHeroUrls);
  } catch (error) {
    console.error("Erreur nettoyage hero :", error.message);
  }

  try {
    const homeBanner = await HomeBanner.findOne();

    const dbBannerUrls = homeBanner?.imageUrl ? [normalizeUrl(homeBanner.imageUrl)] : [];

    await deleteUnusedFiles(folders.banner, dbBannerUrls);
  } catch (error) {
    console.error("Erreur nettoyage banner :", error.message);
  }

  try {
    const aboutPageContent = await AboutPageContent.findOne();

    // Les deux portraits (premier : philosophyImageUrl, second : portrait2Url) partagent le dossier « philosophy ».
    const dbPhilosophyUrls = [aboutPageContent?.philosophyImageUrl, aboutPageContent?.portrait2Url]
      .filter(Boolean)
      .map(normalizeUrl);

    await deleteUnusedFiles(folders.philosophy, dbPhilosophyUrls);

    // Anciennes grandes photos de la page (retirées de l'affichage) : on ne supprime pas leurs fichiers.
    const dbAboutPhotoUrls = [aboutPageContent?.photo1Url, aboutPageContent?.photo2Url]
      .filter(Boolean)
      .map(normalizeUrl);

    await deleteUnusedFiles(folders.about, dbAboutPhotoUrls);
  } catch (error) {
    console.error("Erreur nettoyage about :", error.message);
  }

  try {
    const curiosityItems = await CuriosityItem.find();

    const dbCuriosityUrls = curiosityItems.map((item) => normalizeUrl(item.imageUrl));

    await deleteUnusedFiles(folders.curiosities, dbCuriosityUrls);
  } catch (error) {
    console.error("Erreur nettoyage curiosities :", error.message);
  }
}

module.exports = {
  deleteImages,
};