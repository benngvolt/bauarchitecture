const HeroSettings = require('../models/heroSettings')

/*----------------------------
----- OUTILS INTERNES -------
----------------------------*/

// Récupère (ou prépare) le document unique, en reprenant l'ancienne image unique si besoin.
async function getOrCreateSettings() {
  let settings = await HeroSettings.findOne();

  if (!settings) {
    settings = new HeroSettings({ images: [] });
  }

  if (settings.imageUrl && settings.images.length === 0) {
    settings.images.push({ imageUrl: settings.imageUrl });
  }

  return settings;
}

// imageUrl reste aligné sur la première image (compatibilité avec l'ancien affichage).
function syncCoverImage(settings) {
  settings.imageUrl = settings.images[0]?.imageUrl;
}

function formatHeroSettings(settings) {
  const images = (settings?.images || []).map((image) => ({
    _id: image._id,
    imageUrl: image.imageUrl,
  }));

  return {
    images,
    imageUrl: images[0]?.imageUrl || null,
    title: settings?.title || '',
    description: settings?.description || '',
  };
}

/*----------------------------
----- GET HERO SETTINGS -----
----------------------------*/

exports.getHeroSettings = async (req, res) => {
  try {
    const settings = await HeroSettings.findOne();

    // Reprise de l'ancienne image unique dans la liste (une seule fois).
    if (settings && settings.imageUrl && settings.images.length === 0) {
      settings.images.push({ imageUrl: settings.imageUrl });
      await settings.save();
    }

    res.status(200).json(formatHeroSettings(settings));
  } catch (error) {
    res.status(400).json({ error });
  }
}

/*-------------------------------
----- ADD HERO IMAGES -----------
-------------------------------*/

exports.addHeroImages = async (req, res, next) => {

  const newImages = req.newHeroObjects || [];

  if (newImages.length === 0) {
    return res.status(400).json({ error: 'Aucune image reçue dans la demande.' });
  }

  try {
    const settings = await getOrCreateSettings();

    newImages.forEach((newImage) => {
      settings.images.push({ imageUrl: newImage.imageUrl });
    });

    syncCoverImage(settings);
    await settings.save();

    res.status(201).json({ message: 'Images du hero ajoutées !' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout des images du hero.' });
  }
};

/*-------------------------------
----- REMOVE ONE HERO IMAGE -----
-------------------------------*/

exports.removeHeroImage = async (req, res, next) => {
  try {
    const settings = await getOrCreateSettings();
    const image = settings.images.id(req.params.imageId);

    if (!image) {
      return res.status(404).json({ error: 'Image du hero non trouvée.' });
    }

    settings.images.pull({ _id: image._id });
    syncCoverImage(settings);
    await settings.save();

    res.status(200).json({ message: 'Image du hero supprimée !' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'image du hero.' });
  }
};

/*-------------------------------
----- REORDER HERO IMAGES -------
-------------------------------*/

exports.reorderHeroImages = async (req, res) => {
  const { order } = req.body;

  if (!Array.isArray(order)) {
    return res.status(400).json({ error: 'Le champ "order" est manquant dans la demande.' });
  }

  try {
    const settings = await getOrCreateSettings();
    const imagesById = new Map(
      settings.images.map((image) => [String(image._id), image])
    );

    const orderIds = order.map(String);
    const isValidOrder =
      orderIds.length === imagesById.size &&
      new Set(orderIds).size === orderIds.length &&
      orderIds.every((id) => imagesById.has(id));

    if (!isValidOrder) {
      return res.status(400).json({ error: 'La liste des images est invalide.' });
    }

    settings.images = orderIds.map((id) => {
      const image = imagesById.get(id);
      return { _id: image._id, imageUrl: image.imageUrl };
    });

    syncCoverImage(settings);
    await settings.save();

    res.status(200).json({ message: 'Ordre des images du hero mis à jour !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors du changement d\'ordre des images du hero.' });
  }
};

/*-------------------------------
----- UPDATE HERO TEXTS ---------
-------------------------------*/

const MAX_HERO_TITLE_LENGTH = 300;
const MAX_HERO_DESCRIPTION_LENGTH = 1500;

exports.updateHeroTexts = async (req, res) => {
  const { title, description } = req.body;

  if (typeof title !== 'string' || typeof description !== 'string') {
    return res.status(400).json({ error: 'Les champs "title" et "description" sont requis.' });
  }

  if (title.length > MAX_HERO_TITLE_LENGTH || description.length > MAX_HERO_DESCRIPTION_LENGTH) {
    return res.status(400).json({ error: 'Texte trop long.' });
  }

  try {
    const settings = await getOrCreateSettings();

    settings.title = title.trim();
    settings.description = description.trim();
    await settings.save();

    res.status(200).json({ message: 'Textes du hero mis à jour !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour des textes du hero.' });
  }
};

/*-------------------------------
----- RESET HERO IMAGES ---------
-------------------------------*/

// Ne réinitialise que les images : les textes du hero sont conservés.
exports.deleteHeroSettings = async (req, res, next) => {
  try {
    const settings = await HeroSettings.findOne();

    if (settings) {
      settings.images = [];
      settings.imageUrl = undefined;
      await settings.save();
    }

    res.status(200).json({ message: 'Images du hero réinitialisées.' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la réinitialisation des images du hero.' });
  }
};
