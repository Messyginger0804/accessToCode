// server.js

import 'dotenv/config';
import express from "express";
import pool from "./config/dbConfig.js"; // Adjust the import

import bodyParser from "body-parser";
import cors from 'cors';
import clientRouter from './routes/ClientRouter.js'; // Assuming this is your ClientRouter
import inventoryRouter from './routes/InventoryRouter.js'; // Assuming this is your InventoryRouter

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Assuming pool is correctly set up to handle database connections
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL database:', err);
    } else {
        console.log('Connected to PostgreSQL database');
    }
});

const PORT = process.env.PORT || 3001;

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Use the ClientRouter for '/api/clients'
app.use('/api/clients', clientRouter);

// Use the InventoryRouter for '/api/inventory'
app.use('/api/inventory', inventoryRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
