// action.model.js
class ActionModel {
  constructor(pool, io) {
      this.pool = pool;  // Connexion à la base de données
      this.io = io;      // WebSocket, utilisé si nécessaire pour la gestion en temps réel
  }

  // Méthode pour récupérer toutes les actions sans filtrage
  async getAllActions() {
      try {
          console.log('Connexion à la base de données...');
          // Test simple pour vérifier la connexion
          await this.pool.query('SELECT NOW()');
          console.log('Connexion réussie !');
          
          // Exécuter la requête pour récupérer toutes les actions
          const result = await this.pool.query("SELECT * FROM action");
          return result.rows;  // Retourner les résultats de la base de données
      } catch (err) {
          console.error("Erreur lors de la récupération des actions :", err);
          throw new Error("Impossible de récupérer les actions.");
      }
  }
}

module.exports = ActionModel;
