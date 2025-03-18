const { Pool } = require('pg');

// Liste des bases de données des entreprises
const dbConfigs = {
    client1: { user: 'admin', host: 'xxx.xxx.xxx.xxx', database: 'client1_db', password: 'password', port: 5432 },
    client2: { user: 'admin', host: 'xxx.xxx.xxx.xxx', database: 'client2_db', password: 'password', port: 5432 }
};

// Création de pools de connexions pour chaque base
const pools = {};
Object.keys(dbConfigs).forEach(client => {
    pools[client] = new Pool(dbConfigs[client]);
});

module.exports = pools;
