// models/user.model.js
class User {
    constructor(pool) {
        this.pool = pool;  // Connexion à la base de données via le pool
    }

    // Méthode pour récupérer tous les utilisateurs
    async getAllUsers() {
        try {
            const query = 'SELECT * FROM users';
            const result = await this.pool.query(query);
            return result.rows;
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
            throw new Error("Erreur serveur");
        }
    }

  

    // Méthode pour récupérer un utilisateur par son ID
    async getUserById(id) {
        try {
            const query = 'SELECT * FROM users WHERE id = $1';
            const result = await this.pool.query(query, [id]);
            return result.rows[0];  // Retourner l'utilisateur trouvé
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur:", error);
            throw new Error("Erreur serveur");
        }
    }
}

module.exports = User;
