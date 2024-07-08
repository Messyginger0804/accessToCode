import express from "express";
import { getUsers, pickRandomWinner } from "../service/ClientService.js"; // Assuming your service file is named services.js and contains the PostgreSQL service functions
import { createUser, getAllWinners } from "../service/ClientService.js";
import { addToGivenAwayItems } from '../service/InventoryService.js'; // Import the function to add items to Given Away Items


const router = express.Router();

// Create a client
router.post('/create', async (req, res) => {
    console.log('Request Body:', req.body);
    try {
        const clientData = req.body;
        const createdClient = await createUser(clientData); // Assuming createClient function is defined and imported correctly
        if (createdClient) {
            res.status(201).json(createdClient);
        } else {
            res.status(400).json({ message: 'Error creating client' });
        }
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all clients
router.get('/users', async (req, res) => {
    try {
        const allClients = await getUsers(); // Assuming getClients function is defined and imported correctly
        res.json(allClients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Pick a random winner
router.post('/pick-winner', async (req, res) => {
    try {
        const randomWinner = await pickRandomWinner(); // Function to pick a random winner
        if (randomWinner) {
            console.log('----->', req.body)
            const itemId = req.body.itemId; // Ensure itemId is correctly retrieved from req.body
            const winnerId = randomWinner.id; // Ensure winnerId is correctly retrieved from randomWinner

            // Add the item to Given Away Items
            const givenAwayItem = await addToGivenAwayItems(itemId, winnerId);

            res.json({
                winner: randomWinner,
                givenAwayItem: givenAwayItem
            });
        } else {
            res.status(404).json({ message: 'No clients available or error picking winner' });
        }
    } catch (error) {
        console.error('Error picking random winner:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/winners', async (req, res) => {
    try {
        const winners = await getAllWinners();
        res.json(winners);
    } catch (error) {
        console.error('Error fetching winners:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
