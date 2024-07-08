// services.js

import pool from '../config/dbConfig.js';

// Create a client
export const createClient = async (clientData) => {
    const { name, email, linkedin, password } = clientData;
    const query = 'INSERT INTO clients (name, email, linkedin, password, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *';
    const values = [name, email, linkedin, password];

    try {
        const result = await pool.query(query, values);
        const savedClient = result.rows[0];
        console.log('Client created:', savedClient);
        return savedClient;
    } catch (error) {
        console.error('Error creating client:', error);
        return null;
    }
};

// Get all clients
export const getClients = async () => {
    const query = 'SELECT * FROM clients';

    try {
        const result = await pool.query(query);
        const allClients = result.rows;
        console.log('Total clients:', allClients.length);
        console.log('All clients:', allClients);
        return allClients;
    } catch (error) {
        console.error('Error fetching clients:', error);
        return [];
    }
};

// Get a client by ID
export const getClient = async (id) => {
    const query = 'SELECT * FROM clients WHERE client_id = $1';
    const values = [id];

    try {
        const result = await pool.query(query, values);
        const client = result.rows[0];
        console.log('Client found:', client);
        return client;
    } catch (error) {
        console.error('Error fetching client:', error);
        return null;
    }
};

// Update a client
export const updateClient = async (id, clientData) => {
    const { name, email, linkedin } = clientData;
    const query = 'UPDATE clients SET name = $1, email = $2, linkedin = $3, updated_at = NOW() WHERE client_id = $4 RETURNING *';
    const values = [name, email, linkedin, id];

    try {
        const result = await pool.query(query, values);
        const updatedClient = result.rows[0];
        console.log('Client updated:', updatedClient);
        return updatedClient;
    } catch (error) {
        console.error('Error updating client:', error);
        return null;
    }
};

// Delete a client
export const deleteClient = async (id) => {
    const query = 'DELETE FROM clients WHERE client_id = $1';

    try {
        await pool.query(query, [id]);
        console.log('Client deleted');
    } catch (error) {
        console.error('Error deleting client:', error);
    }
};

// Pick a random winner
export const pickRandomWinner = async () => {
    try {
        const queryAllClients = 'SELECT * FROM clients';
        const resultAllClients = await pool.query(queryAllClients);
        const allClients = resultAllClients.rows;

        const randomIndex = Math.floor(Math.random() * allClients.length);
        const randomWinner = allClients[randomIndex];

        const queryInsertWinner = 'INSERT INTO winners (client_id, user_id, created_at) VALUES ($1, $2, NOW()) RETURNING *';
        const valuesInsertWinner = [randomWinner.client_id, randomWinner.client_id];
        await pool.query(queryInsertWinner, valuesInsertWinner);

        const queryDeleteClient = 'DELETE FROM clients WHERE client_id = $1';
        await pool.query(queryDeleteClient, [randomWinner.client_id]);

        console.log('Random winner:', randomWinner);
        return randomWinner;
    } catch (error) {
        console.error('Error picking random winner:', error);
        return null;
    }
};
