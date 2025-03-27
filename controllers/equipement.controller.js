// equipement.controller.js
const Equipement = require('../models/equipement.model');  // Assurez-vous que le chemin est correct
const pools = require('../config/config');  // Importer la configuration du pool de connexions

// Assurez-vous d'instancier la classe avec le bon pool
const equipementController = {
    async getAllEquipements(req, res) {
        try {
            console.log("Requête reçue pour récupérer les équipements");
    
            let allEquipements = {}; // Stockage des équipements par client
    
            for (const client in pools) {
                const pool = pools[client];
                const equipement = new Equipement(pool);
    
                console.log(`Connexion à la base de données pour ${client}...`);
                const equipements = await equipement.getAllEquipements();
                console.log(`Équipements récupérés pour ${client} :`, equipements);
    
                allEquipements[client] = equipements; // Stocker les équipements
            }
    
            console.log("Réponse finale envoyée :", JSON.stringify(allEquipements, null, 2));
            res.status(200).json(allEquipements);
        } catch (err) {
            console.error("Erreur lors de la récupération des équipements :", err);
            res.status(500).json({ error: 'Impossible de récupérer les équipements.' });
        }
    },
    async getEquipementByModele(req, res) {
        try {
            console.log("📥 Paramètres reçus :", req.params); // Afficher les paramètres reçus
        
            const { modele } = req.params; // ✅ S'assurer que "modele" est bien extrait
            console.log(`🔍 Recherche de l'équipement avec le modèle : ${modele}`);
        
            let allEquipements = {}; // Objet pour stocker les équipements par client
        
            for (const client in pools) {
                const pool = pools[client];
                const equipement = new Equipement(pool);
        
                // Passer correctement le modèle et interroger chaque base
                const equipementsData = await equipement.getEquipementByModele(modele);
        
                if (equipementsData && equipementsData.length > 0) {
                    console.log(`📦 Équipements trouvés pour ${client} :`, equipementsData);
                    allEquipements[client] = equipementsData; // Stocker les résultats par client
                } else {
                    console.log(`Aucun équipement trouvé pour ${client}`);
                    allEquipements[client] = []; // Ajouter une clé avec un tableau vide si aucun équipement trouvé
                }
            }
        
            console.log("📤 Résultats finaux envoyés :", allEquipements);
        
            if (Object.keys(allEquipements).length > 0) {
                res.status(200).json(allEquipements); // Envoyer les résultats structurés par client
            } else {
                res.status(404).json({ error: "Aucun équipement trouvé avec ce modèle." });
            }
        } catch (err) {
            console.error("❌ Erreur lors de la recherche de l'équipement :", err);
            res.status(500).json({ error: "Impossible de récupérer l'équipement." });
        }
    }
    
    
    
};

module.exports = equipementController;
