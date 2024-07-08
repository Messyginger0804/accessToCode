// server.js

import 'dotenv/config';
import express from "express";
import pool from "./config/dbConfig.js"; // Adjust the import

import bodyParser from "body-parser";
import cors from 'cors';
import router from './routes/ClientRouter.js';

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

app.use('/api/clients', router); // Add this line

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
