import 'dotenv/config';
import express from "express";
import connectDB from "./config/dbConfig.js";


const app = express();

connectDB();

const PORT = process.env.PORT || 3001;

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
