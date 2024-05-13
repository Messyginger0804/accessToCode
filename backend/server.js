import 'dotenv/config';
import express from "express";
import connectDB from "./config/dbConfig.js";
import ClientsRouter from './routes/ClientRouter.js'
import PickWinnerRouter from './routes/PickWinnerRouter.js'
import bodyParser from "body-parser";
import cors from 'cors'



const app = express();

app.use(cors());


app.use(bodyParser.json());


connectDB();

const PORT = process.env.PORT || 3001;

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/clients', ClientsRouter); // Add this line
app.use('/api', PickWinnerRouter); // Add this line

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});