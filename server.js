const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(cors());

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.get('/api/users', async (req, res) => {
    try {
        const listUsersResult = await admin.auth().listUsers();
        res.status(200).json(listUsersResult.users);
    } catch (error) {
        res.status(500).send('Erro ao buscar usuários: ' + error);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));