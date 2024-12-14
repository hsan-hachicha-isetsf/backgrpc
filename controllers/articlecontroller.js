const Article = require('../models/Article');
const grpcService = require('../services/grpcService');


exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un article par ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article non trouvé' });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouvel article
exports.createArticle = async (req, res) => {
  const newArticle = new Article(req.body);
  try {
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            { $set: { stock: stock } },
            { new: true }
        );

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }

        // Appel au service gRPC
        grpcService.notifyStockChange(id, stock);

        res.status(200).json({ message: 'Stock mis à jour', article: updatedArticle });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Supprimer un article
exports.deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) return res.status(404).json({ message: 'Article non trouvé' });
    res.status(200).json({ message: 'Article supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
