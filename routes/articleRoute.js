const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articlecontroller');

// CRUD pour les articles
router.get('/', ArticleController.getAllArticles);
router.get('/:id', ArticleController.getArticleById);
router.post('/', ArticleController.createArticle);
router.put('/:id', ArticleController.updateArticle);
router.delete('/:id', ArticleController.deleteArticle);

module.exports = router;
