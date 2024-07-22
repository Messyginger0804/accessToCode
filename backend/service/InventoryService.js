import pool from '../config/dbConfig.js'; // Adjust the import based on your database configuration

// Function to create a new inventory item
export async function createInventoryItem(itemData) {
    const { image_url, make, model, specs } = itemData; // Use 'image_url' instead of 'image'
    const query = 'INSERT INTO inventory (image_url, make, model, specs) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [image_url, make, model, specs];

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
    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // Start transaction

        // Insert into given_away_items
        const insertQuery = `
            INSERT INTO given_away_items (inventory_id, make, model, image_url, specs, raffle_date, winner_id)
            SELECT id, make, model, image_url, specs, $1, $2
            FROM inventory
            WHERE id = $3
            RETURNING *;
        `;
        const insertValues = [raffleDate, winnerId, inventoryId];
        const { rows: givenAwayRows } = await client.query(insertQuery, insertValues);

        if (givenAwayRows.length === 0) {
            throw new Error(`No inventory item found with id ${inventoryId}`);
        }

        // Update inventory item to mark it as given away
        const updateQuery = 'UPDATE inventory SET is_given_away = TRUE WHERE id = $1 RETURNING *;';
        const updateValues = [inventoryId];
        const { rows: updatedRows } = await client.query(updateQuery, updateValues);

        if (updatedRows.length === 0) {
            throw new Error(`Failed to update inventory item with id ${inventoryId}`);
        }

        await client.query('COMMIT'); // Commit transaction

        console.log('Inventory item transferred and updated:', givenAwayRows[0]);
        return {
            givenAwayItem: givenAwayRows[0],
            updatedItem: updatedRows[0]
        };
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback transaction in case of error
        console.error('Error processing given away items:', error);
        throw error;
    } finally {
        client.release(); // Release the client back to the pool
    }
}
