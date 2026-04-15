const express = require('express');

const authorsController = require("../controllers/authors.controller");
const router = express.Router();


// ROUTES
router.get('/', authorsController.getAuthors);
router.post('/', authorsController.createAuthor);
router.put('/', authorsController.updateAuthor);
router.delete("/", authorsController.deleteAuthor);

module.exports = router;