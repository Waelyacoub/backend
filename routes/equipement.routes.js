const express = require('express');
const router = express.Router();
const equipementController = require('../controllers/equipement.controller');  // Chemin vers le contrôleur
console.log("Le fichier equipement.routes.js est chargé");
// Route pour récupérer tous les équipements
router.get('/', equipementController.getAllEquipements);
// Route pour récupérer un équipement par numéro de série
router.get('/modele/:modele', equipementController.getEquipementByModele);

module.exports = router;
