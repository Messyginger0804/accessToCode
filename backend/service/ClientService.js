const Clients = require('../models/Clients');

const createClient = async (clientData) => {
    const client = new Clients(clientData);
    await client.save();
    return client;
};

const getClients = async () => {
    return await Clients.find();
};

const getClient = async (id) => {
    return await Clients.findById(id);
};

const updateClient = async (id, clientData) => {
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

const deleteClient = async (id) => {
    await Clients.findByIdAndRemove(id);
};

module.exports = { createClient, getClients, getClient, updateClient, deleteClient };