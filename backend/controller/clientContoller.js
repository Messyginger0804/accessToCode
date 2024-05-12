const express = require('express');
const router = express.Router();
const Clients = require('./clients.model'); // Import the Clients model

router.post('/create', async (req, res) => {
    try {
        const client = new Clients(req.body);
        await client.save();
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ message: 'Error creating client' });
    }
});

router.get('/', async (req, res) => {
    try {
        const clients = await Clients.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching clients' });
    }
});

// ... other routes ...

module.exports = router;