class Ticket {
    constructor(pool, io) {
        this.pool = pool;
        this.io = io; // WebSocket pour la gestion en temps réel
    }

    async getAllTickets() {
        try {
            // Requête pour récupérer tous les tickets de type 'externe'
            const query = "SELECT * FROM ticket WHERE type LIKE '%Externe%'";
            const result = await this.pool.query(query);
            return result.rows;
        } catch (error) {
            console.error("Erreur lors de la récupération des tickets:", error);
            throw new Error("Impossible de récupérer les tickets.");
        }
    }
}

module.exports = Ticket;
