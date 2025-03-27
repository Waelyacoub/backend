// controllers/user.controller.js
const User = require('../models/user.model');  // Importer le modèle User
const pool = require('../config/config'); // Connexion à la base de données
const userModel = new User(pool);  // Instancier le modèle avec le pool de connexion

// Contrôleur pour récupérer tous les utilisateurs
async function getAllUsers(req, res) {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}



// Contrôleur pour récupérer un utilisateur par son ID
async function getUserById(req, res) {
    const userId = req.params.id;  // Récupérer l'ID de l'utilisateur à partir des paramètres
    try {
        const user = await userModel.getUserById(userId);
        if (user) {
            res.status(200).json({ success: true, data: user });
        } else {
            res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getAllUsers, getUserById };
