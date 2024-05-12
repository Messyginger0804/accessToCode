import 'dotenv/config';
import express from "express";
import connectDB from "./config/dbConfig.js";
import clientsController from './controllers/ClientsController';



const app = express();

connectDB();

const PORT = process.env.PORT || 3001;

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/clients', clientsController); // Add this line

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});