// const Clients = require('../models/Clients');

import Clients from '../models/clients.js';

export const createClient = async (clientData) => {
    const client = new Clients(clientData);
    await client.save();
    return client;
};

export const getClients = async () => {
    const allClients = await Clients.find();
    console.log(allClients.length);
    console.log(allClients);
    return allClients;
};

export const getClient = async (id) => {
    return await Clients.findById(id);
};

export const updateClient = async (id, clientData) => {
    const client = await Clients.findById(id);
    if (!client) {
        return null;
    }
    client.name = clientData.name;
    client.email = clientData.email;
    client.linkedin = clientData.linkedin;
    await client.save();
    return client;
};


export const deleteClient = async (id) => {
    await Clients.findByIdAndRemove(id);
};
