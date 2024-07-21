import express from 'express';
import { createInventoryItem, getAllInventoryItems } from '../service/InventoryService.js';

const router = express.Router();

// Create an inventory item
router.post('/create', async (req, res) => {
    console.log('Request Body:', req.body);
    try {
        const inventoryData = req.body;
        const createdInventoryItem = await createInventoryItem(inventoryData);
        if (createdInventoryItem) {
            res.status(201).json(createdInventoryItem);
        } else {
            res.status(400).json({ message: 'Error creating inventory item' });
        }
    } catch (error) {
        console.error('Error creating inventory item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all inventory items
router.get('/items', async (req, res) => {
    try {
        const allInventoryItems = await getAllInventoryItems();
        res.json(allInventoryItems);
    } catch (error) {
        console.error('Error fetching inventory items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
