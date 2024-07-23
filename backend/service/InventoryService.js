import pool from '../config/dbConfig.js';

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
    const query = 'SELECT * FROM inventory WHERE is_given_away = false ORDER BY created_at ASC'; // Order by created_at

    try {
        const { rows } = await pool.query(query);
        console.log('Fetched inventory items:', rows);
        return rows;
    } catch (error) {
        console.error('Error fetching inventory items from database:', error);
        throw error;
    }
}

// Function to add an item to given away items
export async function addToGivenAwayItems(inventoryId, winnerId, raffleDate) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

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

        await client.query('COMMIT');

        console.log('Inventory item transferred and updated:', givenAwayRows[0]);
        return {
            givenAwayItem: givenAwayRows[0],
            updatedItem: updatedRows[0]
        };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error processing given away items:', error);
        throw error;
    } finally {
        client.release();
    }
}

// Function to delete an inventory item by ID
export async function deleteInventoryItem(itemId) {
    const query = 'DELETE FROM inventory WHERE id = $1 RETURNING *';
    const values = [itemId];

    try {
        const { rows } = await pool.query(query, values);

        if (rows.length === 0) {
            throw new Error(`No inventory item found with id ${itemId}`);
        }

        console.log('Deleted inventory item:', rows[0]);
        return rows[0]; // Return the deleted inventory item
    } catch (error) {
        console.error('Error deleting inventory item from database:', error);
        throw error;
    }
}
