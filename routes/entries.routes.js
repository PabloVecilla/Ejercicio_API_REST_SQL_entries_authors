const express = require('express');

const entriesController = require("../controllers/entries.controller");
const router = express.Router();


// ROUTES
router.get('/', entriesController.getEntries);
router.post('/', entriesController.createEntry);
router.put('/', entriesController.updateEntry);
router.delete("/:id_entrie", entriesController.deleteEntry);

module.exports = router;