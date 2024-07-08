import Clients from '../models/clients.js';
import { Winners } from '../models/winners.js';

export const createClient = async (clientData) => {
    try {
        const client = new Clients(clientData);
        const savedClient = await client.save();
        console.log('Client created:', savedClient);
        return savedClient;
    } catch (error) {
        console.error('Error creating client:', error);
        return null;
    }
};

export const getClients = async () => {
    try {
        const allClients = await Clients.find();
        console.log('Total clients:', allClients.length);
        console.log('All clients:', allClients);
        return allClients;
    } catch (error) {
        console.error('Error fetching clients:', error);
        return [];
    }
};

export const getClient = async (id) => {
    try {
        const client = await Clients.findById(id);
        console.log('Client found:', client);
        return client;
    } catch (error) {
        console.error('Error fetching client:', error);
        return null;
    }
};

export const updateClient = async (id, clientData) => {
    try {
        const client = await Clients.findById(id);
        if (!client) {
            console.log('Client not found');
            return null;
        }
        client.name = clientData.name;
        client.email = clientData.email;
        client.linkedin = clientData.linkedin;
        const updatedClient = await client.save();
        console.log('Client updated:', updatedClient);
        return updatedClient;
    } catch (error) {
        console.error('Error updating client:', error);
        return null;
    }
};

export const deleteClient = async (id) => {
    try {
        await Clients.findByIdAndRemove(id);
        console.log('Client deleted');
    } catch (error) {
        console.error('Error deleting client:', error);
    }
};

export const pickRandomWinner = async () => {
    try {
        const allClients = await Clients.find();
        const randomIndex = Math.floor(Math.random() * allClients.length);
        const randomWinner = allClients[randomIndex];
        console.log('Random winner:', randomWinner);

        // Create a new winner entry in the Winners collection
        const winner = new Winners({
            clientId: randomWinner._id,
            userId: randomWinner._id
        });
        await winner.save();

        // Remove the winner from the Clients collection
        await Clients.findByIdAndRemove(randomWinner._id);

        return randomWinner;
    } catch (error) {
        console.error('Error picking random winner:', error);
        return null;
    }
};