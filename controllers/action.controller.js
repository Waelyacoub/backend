const ActionModel = require('../models/action.model');
const pool = require('../config/config');

const actionController = {
    // Méthode pour récupérer toutes les actions
    async getAllActions(req, res) {
        try {
            console.log("🔍 Récupération des actions...");

            let allActions = {};  // Objet pour stocker les actions par client

            // Boucle sur les clients pour récupérer les actions de chaque client
            for (const client in pool) {
                const clientPool = pool[client];  // Connexion pour chaque client
                try {
                    const actionModel = new ActionModel(clientPool);  // Instancier le modèle Action
                    const result = await actionModel.getAllActions();  // Appeler la méthode pour récupérer les actions
                    allActions[client] = result;  // Stocker les actions du client
                } catch (error) {
                    console.error(`❌ Erreur lors de la récupération des actions pour ${client}:`, error);
                    allActions[client] = [];  // Si une erreur se produit, retourner un tableau vide pour ce client
                }
            }

            // Répondre avec les actions de tous les clients
            res.status(200).json(allActions);
        } catch (err) {
            console.error("❌ Erreur lors de la récupération des actions :", err);
            res.status(500).json({ error: "Impossible de récupérer les actions." });
        }
    }
};

module.exports = actionController;
