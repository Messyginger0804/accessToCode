// models/winners.js
import mongoose from 'mongoose';

const winnerSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        ref: 'Clients',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Winners = mongoose.model('Winners', winnerSchema);

export { Winners };