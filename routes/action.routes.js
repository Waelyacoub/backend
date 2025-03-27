// action.router.js
const express = require('express');
const router = express.Router();
const actionController  = require('../controllers/action.controller');

// Définir une route pour récupérer les équipements et leurs commandes associées
router.get('/', actionController.getAllActions);

module.exports = router;
