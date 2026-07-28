const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const uploadRoot = path.join(__dirname, "../uploads");

const folders = {
  images: "projects_images",
  sketches: "projects_sketches",
  articles: "articles",
  drawings: "drawings",
  hero: "hero",
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
    const articles = req.files?.articles || [];
    const drawings = req.files?.drawings || [];
    const hero = req.files?.hero || [];

    if (
      images.length === 0 &&
      sketches.length === 0 &&
      articles.length === 0 &&
      drawings.length === 0 &&
      hero.length === 0
    ) {
      return next();
    }

    const [
      newImagesObjects,
      newSketchesObjects,
      newArticlesObjects,
      newDrawingsObjects,
      newHeroObjects,
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
        articles.map((file, index) =>
          processAndSaveImage(
            file,
            folders.articles,
            req.body.articleFileIndexes,
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
      Promise.all(
        hero.map((file) => processAndSaveImage(file, folders.hero))
      ),
    ]);

    req.newImagesObjects = newImagesObjects;
    req.newSketchesObjects = newSketchesObjects;
    req.newArticlesObjects = newArticlesObjects;
    req.newDrawingsObjects = newDrawingsObjects;
    req.newHeroObjects = newHeroObjects;

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