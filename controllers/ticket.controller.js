// ticket.controller.js
const Ticket = require('../models/ticket.model');  // Assurez-vous que le chemin est correct

// Cette fonction prend en charge la récupération des tickets pour chaque client
module.exports = (pool, io) => {
    const ticketController = {
        async getAllTickets(req, res) {
            try {
                console.log("Requête reçue pour récupérer les tickets");

                let allTickets = {}; // Stockage des tickets par client

                // Loop pour traiter les connexions des différents clients dans le pool
                for (const client in pool) {
                    const clientPool = pool[client];
                    const ticket = new Ticket(clientPool, io); // Passer le pool et io au modèle

                    console.log(`Connexion à la base de données pour ${client}...`);
                    const tickets = await ticket.getAllTickets();
                    console.log(`Tickets récupérés pour ${client} :`, tickets);

                    allTickets[client] = tickets; // Stocker les tickets par client
                }

                console.log("Réponse finale envoyée :", JSON.stringify(allTickets, null, 2));
                res.status(200).json(allTickets); // Réponse JSON avec tous les tickets
            } catch (err) {
                console.error("Erreur lors de la récupération des tickets :", err);
                res.status(500).json({ error: 'Impossible de récupérer les tickets.' });
            }
        }
    };

    return ticketController;
};
