const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const equipementRouter = require('./routes/equipement.routes');
const ticketRouter = require('./routes/ticket.routes');
const actionRouter = require('./routes/action.routes');
const userRouter = require('./routes/user.routes');
const pool = require('./config/config'); 

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());

// Route de test
app.get('/test', (req, res) => {
    res.send('Route de test fonctionne');
});

// Utilisation des routeurs
console.log('Le routeur equipement est enregistré');
app.use('/api/equipements', equipementRouter);
console.log('Route /api/tickets enregistrée');
app.use('/api/tickets', ticketRouter);
console.log('Route /api/actions enregistrée');
app.use('/api/actions', actionRouter);
console.log('Route /api/users enregistrée');
app.use('/api/users', userRouter);

// Route par défaut
app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur API pour gestion des équipements, tickets, et actions');
});

// 🔍 Affichage des routes enregistrées pour le debug
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`Route enregistrée : ${r.route.path}`);
    }
});

// 📌 Fonction pour récupérer la base de données associée à un client
async function getDatabaseNameForClient(clientId) {
    try {
        const result = await pool.query(`SELECT database_name FROM clients WHERE client_id = $1`, [clientId]);
        return result.rows[0]?.database_name || "unknown_database";
    } catch (error) {
        console.error("Erreur lors de la récupération de la base :", error);
        return "error_database";
    }
}

// 📌 WebSocket: Gestion des connexions
io.on('connection', async (socket) => {
    const clientId = socket.handshake.query.clientId || socket.id; // Récupération de l'ID client depuis la requête WebSocket
    const databaseName = await getDatabaseNameForClient(clientId);

    console.log(`🔌 Connexion réussie pour ${clientId} (Base : ${databaseName})`);

    // Envoyer un message de bienvenue avec le nom de la base
    socket.emit('welcome', `Bienvenue, vous êtes connecté à la base ${databaseName}`);

    // Écouter un message envoyé par un client
    socket.on('message', (data) => {
        console.log(`📨 Message de ${clientId} (${databaseName}): ${data}`);
        io.emit('message', `Serveur (Base: ${databaseName}) a reçu: ${data}`);
    });

    socket.on('disconnect', () => {
        console.log(`❌ Déconnexion de ${clientId} (Base : ${databaseName})`);
    });
});

// 📌 Démarrer le serveur HTTP + WebSocket
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`🚀 Serveur HTTP & WebSocket démarré sur le port ${port}`);
});

module.exports = io;
