import pool from '../config/dbConfig.js'; // Adjust the import based on your database configuration

// Function to create a new inventory item
export async function createInventoryItem(itemData) {
    const { image, make, model, specs } = itemData;
    const query = 'INSERT INTO inventory (image, make, model, specs) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [image, make, model, specs];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0]; // Return the newly created inventory item
    } catch (error) {
        console.error('Error creating inventory item in database:', error);
        throw error;
    }
}

// Function to retrieve all inventory items
export async function getAllInventoryItems() {
    const query = 'SELECT * FROM inventory';

    try {
        const { rows } = await pool.query(query);
        console.log('Fetched inventory items:', rows); // Log fetched rows
        return rows; // Return all inventory items
    } catch (error) {
        console.error('Error fetching inventory items from database:', error);
        throw error;
    }
}

export async function addToGivenAwayItems(inventoryId, winnerId, raffleDate) {
    try {
        const query = `
            INSERT INTO given_away_items (inventory_id, make, model, image_url, specs, raffle_date, winner_id)
            SELECT id, make, model, image_url, specs, $1, $2
            FROM inventory
            WHERE id = $3
            RETURNING *;
        `;
        const values = [raffleDate, winnerId, inventoryId];
        const { rows } = await pool.query(query, values);

        if (rows.length === 0) {
            throw new Error(`No inventory item found with id ${inventoryId}`);
        }

        console.log('Inventory item transferred:', rows[0]);
        return rows[0];
    } catch (error) {
        console.error('Error adding to given away items:', error);
        throw error;
    }
}
