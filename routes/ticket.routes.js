// ticket.routes.js
const express = require('express');
const router = express.Router();

// Importer la fonction de contrôleur (avec le pool et io)
const ticketController = require('../controllers/ticket.controller');
const pool = require('../config/config');
const io = require('../server');  // Si vous avez une instance de io dans votre serveur

// Récupérer les tickets pour chaque client
router.get('/', (req, res) => {
    const controller = ticketController(pool, io);  // Instancier le contrôleur avec le pool et io
    controller.getAllTickets(req, res);  // Appeler la méthode pour récupérer les tickets
});

module.exports = router;
