import express from "express";
// import { Clients } from '../models/clients.js'
import Clients from '../models/clients.js'


const router = express.Router();


router.post('/create', async (req, res) => {
    console.log('Request Body:', req.body);
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

router.get('/winner', async (req, res) => {
    try {
        const allClients = await Clients.find();
        const randomIndex = Math.floor(Math.random() * allClients.length);
        const randomWinner = allClients[randomIndex];
        res.json(randomWinner);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching random winner' });
    }
});


export default router;