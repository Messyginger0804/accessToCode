import express from "express";
import WinnerService from '../service/GetWinnerService.js';
import { Clients } from '../models/clients.js'

const router = express.Router();



router.post('/pick-winner', async (req, res) => {
    try {
        const clients = await Clients.findAll();
        const winner = await WinnerService.pickWinner(clients);
        res.json(winner);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error picking winner' });
    }
});

export default router;