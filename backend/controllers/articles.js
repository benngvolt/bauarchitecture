const Article = require('../models/article');
const { storage, bucket } = require('../config/storage');

/*------------------------
----- GET ALL ARTICLES ---
-------------------------*/

exports.getAllArticles = (req, res) => {
  Article.find()
    .then(articles => res.status(200).json(articles))
    .catch(error => res.status(400).json({ error }));
};

/*------------------------
----- GET ONE ARTICLE ----
-------------------------*/

exports.getOneArticle = (req, res) => {
  Article.findOne({ _id: req.params.id })
    .then(article => res.status(200).json(article))
    .catch(error => res.status(400).json({ error }));
};

/*--------------------------
----- DELETE ONE ARTICLE -----
--------------------------*/

exports.deleteOneArticle = async (req, res, next) => {
  try {
    const deletedArticle = await Article.findOneAndDelete({ _id: req.params.id });

    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    res.status(200).json({ message: 'Article supprimé !' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression de l'article" });
  }
};

/*------------------------
----- CREATE ARTICLE -----
------------------------*/

exports.createArticle = async (req, res) => {
  const articleData = req.body;
  const articles = req.newArticlesObjects;

  const descriptionWithBr = req.body.description;

  if (!articleData.title) {
    return res.status(400).json({ error: 'Le champ "title" est manquant dans la demande.' });
  }

  try {
    const article = new Article({
      ...articleData,
      description: descriptionWithBr,
      articles: articles,
    });

    await article.save();
    res.status(201).json({ message: 'Article enregistré !' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};

/*--------------------------
----- UPDATE ONE ARTICLE -----
--------------------------*/

exports.updateOneArticle = async (req, res, next) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });

    if (!article) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    const articleData = req.body;
    const descriptionWithBr = req.body.description;

    const existingArticles = req.body.existingArticles || [];
    const existingArticlesObjects = existingArticles.map((articleStr) => JSON.parse(articleStr));

    async function processAndSortArticles(existingArticlesObjects, newArticlesObjects) {
      const allArticles = existingArticlesObjects
        .map((article, index) => ({
          imageUrl: article.imageUrl,
          index,
        }))
        .concat(newArticlesObjects);

      allArticles.sort((a, b) => a.index - b.index);

      const updatedArticles = allArticles.filter(
        (article) => article != null && article !== "empty"
      );

      return updatedArticles;
    }

    async function updateArticle(updatedArticles) {
      const updatedMainArticleIndex = req.body.mainArticleIndex || 0;

      if (!articleData.title) {
        return res.status(400).json({ error: 'Le champ "title" est manquant dans la demande.' });
      }

      const articleObject = {
        ...articleData,
        description: descriptionWithBr,
        mainArticleIndex: updatedMainArticleIndex,
        articles: updatedArticles,
      };

      await Article.updateOne({ _id: req.params.id }, articleObject);

      console.log('Article updated successfully');
      res.status(200).json({ message: 'Article modifié' });
      next();
    }

    const newArticlesObjects = req.newArticlesObjects || [];
    const updatedArticles = await processAndSortArticles(existingArticlesObjects, newArticlesObjects);

    await updateArticle(updatedArticles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'article." });
  }
};